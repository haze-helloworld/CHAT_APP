import jwt from 'jsonwebtoken';
import {ENV} from '../libs/env.js';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: 'Unauthorized - no token provided'});
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'Unauthorized - invalid token'});
        }
        const user = await User.findById(decoded.id).select('-password'); // select everything except password because we dont want to send password to client
        if(!user){
            return res.status(401).json({message: 'Unauthorized - user not found'});
        }
        req.user = user;
        next();
    }
    catch(err){
        console.error("Error in protectRoute middleware:", err);
        return res.status(500).json({message: 'Unauthorized - error verifying token'});
    }
}