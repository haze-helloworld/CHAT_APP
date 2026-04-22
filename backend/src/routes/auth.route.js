import express from 'express';
const authRouter = express.Router();


authRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from auth route!' });
}   
);
authRouter.get('/login', (req, res) => {
    
});
authRouter.get('/logout', (req, res) => {
        res.json({ message: 'Logged out successfully!' });
});
authRouter.get('/signup', (req, res) => {
    
});



export default authRouter;