import express from 'express';
import cors from 'cors';
import homeRouter from './routes/home.js';
import mailerRouter from './controllers/mailerController.js';
import authRouter from './routes/auth.route.js';

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true}
));
app.use(express.json());
app.use('/chat/home', homeRouter);
app.use('/chat/home/data', mailerRouter);
app.use('/chat/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    