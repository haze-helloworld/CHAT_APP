import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const validateFriendCode = async (req, res, next) => {
    
    const { friendCode } = req.body;
    try{
        const user = await User.findOne({ friendCode });
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        next();
    }
    catch(error){
        console.error("Error validating friend code:", error);
        res.status(500).json({error: "Failed to validate friend code"});
    }
}

