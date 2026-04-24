import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const validateContactId = async (req, res, next) => {
    console.log("Validating contact ID:", req.body.contactId);
    const {contactId} = req.body;
    try{
        const user = await User.findById(contactId);
        if(!user){
            return res.status(404).json({error: "Contact not found"});
        }
        next();
    }
    catch(error){
        console.error("Error validating contact ID:", error);
        res.status(500).json({error: "Failed to validate contact ID"});
    }
}
