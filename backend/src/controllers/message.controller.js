import Message from '../models/Message.js';
import ChatRoom from '../models/chatRoom.js';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';

export const getAllContacts = async (req, res) => {
    try{
        const loggedinUserId = req.user._id;
        const user = await User.findById(loggedinUserId);
        const contacts = await User.find({_id: {$in: user.contacts}}).select("-password");
        res.json({ contacts });
    }
    catch(err){
        console.error("Error fetching contacts:", err);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
   
};

export const addContacts = async (req, res) => {
    try{
        const loggedinUserId = req.user._id;
        const {UserId} = req.body;
        const user = await User.findById(loggedinUserId);

        if (user.contacts.some(id => id.toString() === UserId)) {
            return res.status(400).json({ error: "Contact already exists" });
        }
    
        
        user.contacts.push(UserId);
        await user.save();
        res.json({ message: "Contact added successfully" });
        
    }
    catch(error){
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Failed to add contact" });
    }
}

export const getAllChats = async (req, res) => {
    try{
        const loggedinUserId = req.user._id;
        const chats = await ChatRoom.find(
          { participants: loggedinUserId },
          { _id: 1, lastMessage: 1 })
            .populate('lastMessage')
            .sort({ updatedAt: -1 })
            .lean();
        res.json({ chats });
    }
    catch(err){
        console.error("Error fetching chat rooms:", err);
        res.status(500).json({ error: "Failed to fetch chat rooms" });
    }
};

export const getMessagesById = async (req, res) => {
    try{
        const chatId = req.params.chatId;
        const { cursor } = req.query;
        if (!chatId) {
        return res.status(400).json({ error: "chatId is required" });}

        const query = { chatId: chatId };
         if (cursor) {
            query.createdAt = { $lt: new Date(cursor) };
        }

        const messages = await Message.find(query).sort({ createdAt: -1 }).limit(50).lean();
         
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

export const createGroup = async (req, res) => {
    const { groupName, participantIds } = req.body;

    
    try{
        const loggedinUserId = req.user._id;    
        const newChatRoom = new ChatRoom({
            name: groupName,
            participants: [loggedinUserId, ...participantIds]
        });
        await newChatRoom.save();
        res.status(201).json({ message: "Group created successfully", chatRoom: newChatRoom });
    }
    catch(err){
        console.error("Error creating group:", err);
        res.status(500).json({ error: "Failed to create group" });
    }
};

export const sendMessage = async (req, res) => {
    const {chatId, content} = req.body;
    try{
        const loggedinUserId = req.user._id;
        const newMessage = new Message({
            chatId,
            sender: loggedinUserId,
            content : content
        });
        await newMessage.save();
        await ChatRoom.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } }, { $set: { lastMessage: newMessage._id } });
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    }
    catch(err){
        console.error("Error sending message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
};