import Message from '../models/Message.js';
import ChatRoom from '../models/chatRoom.js';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';
import cloudinary from '../libs/cloudinary.js';
import { nanoid } from 'nanoid';
import { getRecieversSocketIds } from '../libs/socket.js';

export const getAllContacts = async (req, res) => {
    try {
        const user = req.user;

        // Get all contact user IDs
        const contactIds = user.contacts.map(
            contact => contact.userId
        );

        // Get all contact users
        const users = await User.find({
            _id: { $in: contactIds }
            
        }).select("-password");

        // Get all chat IDs
        const chatIds = user.contacts.map(
            contact => contact.chatId
        );

        // Get all chats with last message
        const chats = await ChatRoom.find({
            _id: { $in: chatIds }
        })
        .populate("lastMessage")
        .lean();

        // Merge user + chat data
        const contacts = user.contacts.map(contact => {

            const contactUser = users.find(
                u => u._id.toString() === contact.userId.toString()
            );

            const chat = chats.find(
                c => c._id.toString() === contact.chatId.toString()
            );

            return {
                user: contactUser,
                chatId: contact.chatId,
                chat: {
                    _id: chat?._id,
                    lastMessage: chat?.lastMessage,
                    updatedAt: chat?.updatedAt
                }
            };
        });

        return res.status(200).json({
            contacts
        });

    } catch (error) {
        console.error("Error fetching contacts:", error);

        return res.status(500).json({
            error: "Failed to fetch contacts"
        });
    }
};
   

export const addContacts = async (req, res) => {
    try{
        const loggedinUser= req.user;
        const loggedinUserId = req.user._id;
        const friendCode = req.body.friendCode;
        const friend = await User.findOne({ friendCode });

         if(!friend){
                    return res.status(404).json({
                        error: "User not found"
                    });
                }
        const FriendId = friend._id;

         
        if (loggedinUserId.toString() === friend._id.toString()) {
                return res.status(400).json({
                    error: "You cannot add yourself"
                    });
                }

              
                    
                if (loggedinUser.contacts.some(contact => contact.userId.toString() === FriendId)){
                        return res.status(400).json({
                        error: "Contact already exists"
                                });
                                }
        const chatroom = await ChatRoom.create({
                participants: [loggedinUserId, FriendId],
                isGroup: false,
                groupCode: nanoid(8)
            });
       
        
         
        loggedinUser.contacts.push({userId: FriendId, chatId: chatroom._id});
        friend.contacts.push({userId: loggedinUserId, chatId: chatroom._id});
        await loggedinUser.save();
        await friend.save();
        res.json({
            message: "Contact added successfully",
            chatId: chatroom._id,
            user: {
                _id: friend._id,
             
            }
        });
    }
    catch(error){
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Failed to add contact" });
    }
}
export const createGroupChat = async (req, res) => {
    try {
        const loggedinUserId = req.user._id;

        const {
            groupName,
            participants,
            profilePic
        } = req.body;

        if (
            !groupName ||
            !Array.isArray(participants) ||
            participants.length < 1
        ) {
            return res.status(400).json({
                error: "Invalid group chat data"
            });
        }

        const users = await User.find({
            friendCode: { $in: participants }
        }).select("_id");

        const participantIds = users.map(
            user => user._id
        );

        participantIds.push(loggedinUserId);

        const uniqueParticipantIds = [
            ...new Set(
                participantIds.map(id => id.toString())
            )
        ];

        const chatroom = await ChatRoom.create({
            groupName,
            admin: loggedinUserId,
            participants: uniqueParticipantIds,
            isGroupChat: true,
            groupCode: nanoid(8),
            groupPic: profilePic
        });

        res.status(201).json({
            message: "Group chat created successfully",
            chatId: chatroom._id
        });

    } catch (error) {
        console.error(
            "Error creating group chat:",
            error
        );

        res.status(500).json({
            error: "Failed to create group chat"
        });
    }
};
export const getAllChats = async (req, res) => {
    try {
        const loggedinUserId = req.user._id;

        const chats = await ChatRoom.find({
            participants: loggedinUserId
        })
        .populate(
            "participants",
            "fullName profilePic email friendCode status"
        ).populate(
    "admin",
    "fullName profilePic"
)
       .populate({
        path: "lastMessage",
        populate: {
            path: "senderId",
            select: "fullName "
        }
    })
    
        .sort({ updatedAt: -1 })
        .lean();

        const formattedChats = chats .filter(chat => chat.lastMessage || chat.isGroupChat).map(chat => {
            
            
             
            // Group Chat
            if (chat.isGroupChat) {
                return {
                    chatId: chat._id,
                    isGroupChat: true,
                    name: chat.groupName,
                    profileImage: chat.groupPic,
                    groupCode: chat.groupCode,
                    admin: chat.admin.fullName,
                    participants: chat.participants.map(participant => ({
                        _id: participant._id,
                        fullName: participant.fullName,
                        profilePic: participant.profilePic,
                        friendCode: participant.friendCode})),
                    lastMessage: chat.lastMessage
                        ? {
                              id: chat.lastMessage._id,
                              text: chat.lastMessage.content?.text,
                              mediaUrl: chat.lastMessage.content?.mediaUrl,
                              messageType: chat.lastMessage.messageType,
                              senderId: chat.lastMessage.senderId,
                              createdAt: chat.lastMessage.createdAt
                          }
                        : null
                };
            }

            // Direct Chat
            const otherUser = chat.participants.find(
                participant =>
                    participant._id.toString() !==
                    loggedinUserId.toString()
            );

            return {
                chatId: chat._id,
                isGroupChat: false,

                user: {
                    _id: otherUser?._id,
                    fullName: otherUser?.fullName,
                    profileImage: otherUser?.profileImage,
                    email: otherUser?.email,
                    profilePic: otherUser?.profilePic,
                    friendCode: otherUser?.friendCode,
                    status: otherUser?.status
                },

                lastMessage: chat.lastMessage
                    ? {
                          id: chat.lastMessage._id,
                          text: chat.lastMessage.content?.text,
                          mediaUrl: chat.lastMessage.content?.mediaUrl,
                          messageType: chat.lastMessage.messageType,
                          senderId: chat.lastMessage.senderId,
                          createdAt: chat.lastMessage.createdAt
                      }
                    : null
            };
        });

        return res.status(200).json({
            chats: formattedChats
        });

    } catch (error) {
        console.error("Error fetching chats:", error);

        return res.status(500).json({
            error: "Failed to fetch chats"
        });
    }
};

export const getMessagesById = async (req, res) => {
    try{
        const {chatId} = req.params;
        const { cursor } = req.query;
        if (!chatId) {
        return res.status(400).json({ error: "chatId is required" });}

        const query = { chatId: chatId };
         if (cursor) {
            query.createdAt = { $lt: new Date(cursor) };
        }

        const messages = await Message.find(query).sort({ createdAt: 1 }).populate('senderId createdAt', 'fullName profilePic').limit(50).lean();
         
        res.json({
            messages,
            nextCursor: messages.length > 0 
                ? messages[messages.length - 1].createdAt 
                : null
        });

    }
    catch(err){
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

export const getParticipants = async (req, res) => {
    try{
        const chatId = req.params.chatId;

        const chatRoom = await ChatRoom.findById(chatId).populate('participants', '-password');
            if(!chatRoom){  
                return res.status(404).json({ error: "Chat room not found" });
            }
        res.json({ participants: chatRoom.participants });
    }
    catch(err){
        console.error("Error fetching participants:", err);
        res.status(500).json({ error: "Failed to fetch participants" });
    }
};

export const addParticipant = async (req, res) => {
    try{
        const chatId = req.params.chatId;
        const { UserId } = req.body;
        const chatRoom = await ChatRoom.findById(chatId);
        if(!chatRoom){
            return res.status(404).json({ error: "Chat room not found" });
        }
        if(chatRoom.participants.some (id => id.toString() === UserId)){
            return res.status(400).json({ error: "Participant already in group" });
        }
        chatRoom.participants.push(UserId);
        await chatRoom.save();
        res.json({ message: "Participant added successfully" });
    }
    catch(err){
        console.error("Error adding participant:", err);
        res.status(500).json({ error: "Failed to add participant" });
    }
};

export const removeParticipant = async (req, res) => {
    try{
        const chatId = req.params.chatId;
        const { UserId } = req.body;
        const chatRoom = await ChatRoom.findById(chatId);  
        if(!chatRoom){
            return res.status(404).json({ error: "Chat room not found" });
        }
        chatRoom.participants = chatRoom.participants.filter(id => id.toString() !== UserId);
        await chatRoom.save();
        res.json({ message: "Participant removed successfully" });
    }
    catch(err){
        console.error("Error removing participant:", err);
        res.status(500).json({ error: "Failed to remove participant" });
    }
};


export const sendMessage = async (req, res) => {
    const {text} = req.body;
    const content = {text: text};
    const {mediaUrl} = req.body;
    const messageType = req.body.messageType;   
    const chatId = req.params.chatId;
    if (messageType == "image" && mediaUrl) {
        const uploadResponse = await cloudinary.uploader.upload(mediaUrl);
        content.mediaUrl = uploadResponse.secure_url;
    }
    try{
        const loggedinUserId = req.user._id;
        const newMessage = new Message({
            chatId,
            senderId: loggedinUserId,
            content : content,
            messageType: messageType || "text"
        });
        await newMessage.save();
        const chatRoom = await ChatRoom.findById(chatId);


     
        await ChatRoom.findByIdAndUpdate((chatId), { $push: { messages: newMessage._id }, $set: { lastMessage: newMessage._id }} );

        await newMessage.populate('senderId', 'fullName profilePic');


        const RecieverSocketIds = getRecieversSocketIds(
    chatRoom.participants.filter(id => id.toString() !== loggedinUserId.toString())
);
        RecieverSocketIds.forEach(socketId => {
            req.io.to(socketId).emit("newMessage", newMessage
            );
        });
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    }
    catch(err){
        console.error("Error sending message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
};
