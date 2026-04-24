import express from 'express';

import { getAllContacts, getAllChats, getMessageById, getParticipants, addContacts } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { validateContactId } from '../middleware/validateContactId.middleware.js';
const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.get('/contacts', getAllContacts);
messageRouter.get('/chats', getAllChats);
messageRouter.get('/:chatId', getMessageById);
messageRouter.get('/:groupId/participants', getParticipants);

//messageRouter.post('/send/:chatId', sendMessage);
//messageRouter.post('add-participant/:groupId', addParticipant);
//messageRouter.post('remove-participant/:groupId', removeParticipant);
//messageRouter.post('create-group', createGroup);

messageRouter.post('/add-contacts',validateContactId, addContacts);

messageRouter.get('/send', (req, res) => {
    res.json({ message: 'Hello from send message route!' });
});

export default messageRouter;