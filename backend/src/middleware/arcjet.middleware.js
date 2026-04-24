import aj from "../libs/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect";

export const arcjetprotection = async (req, res, next) => {
    try{
        const decision = await aj.protect(req);

        if(decision.isDenied){
        if(decision.reason.isRateLimit){
                return res.status(429).json({error: "Too many requests. Please try again later."});
            }
        

        else if (decision.reason.isBot){
            return res.status(403).json({error: "Access denied. Bot traffic is not allowed."});
        }
        else{
            return res.status(403).json({error: "Access denied. Suspicious activity detected."});
            
        }
    }
    
        if (decision.results.some(isSpoofedBot)){
            return res.status(403).json({error: "Access denied. Bot traffic is not allowed."});
        }


        next();
    }
    catch(err){
        console.error("Error in arcjetprotection middleware:", err);
        next();
    }
}