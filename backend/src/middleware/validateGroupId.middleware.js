import User from "../models/User.js";
import { ObjectId } from "mongodb";
import ChatRoom from "../models/chatRoom.js";
export const validatechatId = async (req, res, next) => {
    
    const {chatId} = req.params;
    try{
        const group = await ChatRoom.findById(chatId);
        if(!group){
            return res.status(404).json({error: "Chat Room not found"});
        }
        next();
    }
    catch(error){
        console.error("Error validating group ID:", error);
        res.status(500).json({error: "Failed to validate group ID"});
    }
}
