import express from 'express';

const messageRouter = express.Router();

messageRouter.get('/send', (req, res) => {
    res.json({ message: 'Hello from send message route!' });
});

export default messageRouter;