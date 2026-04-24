import express from 'express';

import { getAllContacts, getAllChats, getMessageById, getParticipants, addContacts } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { validateContactId } from '../middleware/validateUserId.middleware.js';
const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.post('/add-contacts',validateUserId, addContacts);
messageRouter.get('/contacts', getAllContacts);
messageRouter.get('/chats', getAllChats);
messageRouter.get('/:chatId', getMessagesById);
messageRouter.get('/:groupId/participants', getParticipants);

messageRouter.post('/send/:groupId', sendMessage);

messageRouter.post('/add-participant/:groupId', validateUserId,validateGroupId, addParticipant);
messageRouter.post('/remove-participant/:groupId', validateUserId,validateGroupId, removeParticipant);
messageRouter.post('/create-group', createGroup);

export default messageRouter;