import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {ENV} from "../libs/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie?.split('; ').find((row)=> row.startsWith('jwt='))?.split('=')[1];
        if (!token) {
            return next(new Error('Authentication error: Token not provided'));
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        if(!decoded){
            return next(new Error('Authentication error: Invalid token'));``
        }

        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user;
        socket.userId = user._id.toString();
         
        next();
    }
        catch (error) {
            console.error('Error in socket authentication middleware:', error);
            return next(new Error('Authentication error: Invalid token'));
        }}