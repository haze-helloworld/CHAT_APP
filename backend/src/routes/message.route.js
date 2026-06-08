import express from 'express';

import { getAllContacts, getAllChats, getParticipants, addContacts, addParticipant, getMessagesById, removeParticipant, createGroup, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { validateUserId } from '../middleware/validateUserId.middleware.js';
import { validatechatId } from '../middleware/validateGroupId.middleware.js';
const messageRouter = express.Router();

messageRouter.use(protectRoute);
//contacts
messageRouter.post('/contacts', validateUserId, addContacts);
messageRouter.get('/contacts', getAllContacts);

//chats
messageRouter.get('/chats', getAllChats);
messageRouter.post('/chats/group', createGroup);

//messages
messageRouter.get('/chats/:chatId/messages', validatechatId, getMessagesById);
messageRouter.post('/chats/:chatId/messages', validatechatId, sendMessage);

//participants
messageRouter.get('/chats/:chatId/participants', validatechatId, getParticipants);
messageRouter.post('/chats/:chatId/participants', validateUserId, validatechatId, addParticipant);
messageRouter.delete('/chats/:chatId/participants', validateUserId, validatechatId, removeParticipant);
export default messageRouter;