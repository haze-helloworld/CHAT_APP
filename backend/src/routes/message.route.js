import express from 'express';

import { getAllContacts, getAllChats, getParticipants, addContacts, addParticipant, getMessagesById, removeParticipant, createGroup, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { validateUserId } from '../middleware/validateUserId.middleware.js';
import { validatechatId } from '../middleware/validateGroupId.middleware.js';
const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.post('/add-contacts',validateUserId, addContacts);
messageRouter.get('/contacts', getAllContacts);
messageRouter.get('/chats', getAllChats);
messageRouter.get('/:chatId',validatechatId,getMessagesById);
messageRouter.get('/:chatId/participants',validatechatId,getParticipants);

messageRouter.post('/send/:chatId', sendMessage);

messageRouter.post('/add-participant/:chatId', validateUserId,validatechatId, addParticipant);
messageRouter.post('/remove-participant/:chatId', validateUserId,validatechatId, removeParticipant);

messageRouter.post('/create-group', createGroup);

export default messageRouter;