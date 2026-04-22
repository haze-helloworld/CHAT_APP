import express from 'express';
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from home route!' });
});

homeRouter.post('/data', (req, res) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});

export default homeRouter;