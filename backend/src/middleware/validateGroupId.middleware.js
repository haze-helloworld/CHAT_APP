import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const validateGroupId = async (req, res, next) => {
    
    const {GroupId} = req.params.groupId;
    try{
        const group = await ChatRoom.findById(GroupId);
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
