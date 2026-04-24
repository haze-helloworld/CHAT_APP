import express from 'express';
import {signup, login, logout, updateProfile} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';
import { arcjetprotection } from '../middleware/arcjet.middleware.js';


const authRouter = express.Router();

authRouter.use(arcjetprotection); // Apply Arcjet protection to all auth routes

authRouter.post('/signup', signup);
authRouter.post('/login', login); //postman is detected as bot by arcjet
authRouter.post('/logout', logout);
authRouter.put('/update-profile',protectRoute,updateProfile);
authRouter.get('/check' , protectRoute, (req, res) => {
    res.status(200).json(req.user);
});
export default authRouter;