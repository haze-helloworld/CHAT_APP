import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const validateUserId = async (req, res, next) => {
    
    const {UserId} = req.body;
    try{
        const user = await User.findById(UserId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        next();
    }
    catch(error){
        console.error("Error validating user ID:", error);
        res.status(500).json({error: "Failed to validate user ID"});
    }
}
