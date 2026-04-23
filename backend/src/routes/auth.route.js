import express from 'express';
import {signup} from '../controllers/auth.controller.js';

const authRouter = express.Router();



authRouter.post('/signup', signup);


authRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from auth route!' });
}   
);
authRouter.get('/login', (req, res) => {
    
});
authRouter.get('/logout', (req, res) => {
        res.json({ message: 'Logged out successfully!' });
});


export default authRouter;