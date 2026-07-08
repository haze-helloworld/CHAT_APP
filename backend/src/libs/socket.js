import {Server} from "socket.io";
import http from "http";
import express from "express";
import {ENV} from "./env.js";
import {socketAuthMiddleware} from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app); 

const io = new Server(server,{
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true   ,
                                         
    },
    transports: ['websocket'],    
});

io.use((socketAuthMiddleware));


export const getRecieversSocketIds = (userIds) => {
    return userIds.map(id => userSocketMap[id]).filter(id => id); //sends socketIds of only those users who are online
}
export const getRecieverSocketId = (userId) => {
    return userSocketMap[userId];
}
const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

  
    if (socket.userId) {
        userSocketMap[socket.userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
       
        if (socket.userId) {
            delete userSocketMap[socket.userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app,userSocketMap, server};