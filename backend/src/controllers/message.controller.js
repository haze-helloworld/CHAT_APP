import Message from '../models/Message.js';
import ChatRoom from '../models/chatRoom.js';
import User from '../models/User.js';
import { validateContactId } from '../middleware/validateContactId.middleware.js';
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

export const getAllChats = async (req, res) => {
    try{
        const loggedinUserId = req.user._id;
        const chatRooms = await ChatRoom.find({ participants: loggedinUserId }).populate('participants', '-password');
        res.json({ chatRooms });
    }
    catch(err){
        console.error("Error fetching chat rooms:", err);
        res.status(500).json({ error: "Failed to fetch chat rooms" });
    }
};

export const getMessageById = async (req, res) => {
    try{
        const messageId = req.params.id;
        const message = await Message.findById(messageId);
        res.json({ message });
    }
    catch(err){
        console.error("Error fetching message:", err);
        res.status(500).json({ error: "Failed to fetch message" });
    }
};

export const getParticipants = async (req, res) => {
    try{
        const groupId = req.params.groupId;
        const chatRoom = await ChatRoom.findById(groupId).populate('participants', '-password');
        res.json({ participants: chatRoom.participants });
    }
    catch(err){
        console.error("Error fetching participants:", err);
        res.status(500).json({ error: "Failed to fetch participants" });
    }
};

export const addContacts = async (req, res) => {
    try{
        console.log("Adding contact with ID:", req.body.contactId);
        const loggedinUserId = req.user._id;
        const contactId = (req.body.contactId);
        const user = await User.findById(loggedinUserId);

        if (user.contacts.some(id => id.toString() === contactId)) {
            return res.status(400).json({ error: "Contact already exists" });
        }
    
        
        user.contacts.push(contactId);
        await user.save();
        res.json({ message: "Contact added successfully" });
        
    }
    catch(error){
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Failed to add contact" });
    }
}
