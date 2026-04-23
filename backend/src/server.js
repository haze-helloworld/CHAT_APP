import express from 'express';
import cors from 'cors';
import homeRouter from './routes/home.js';
import mailerRouter from './controllers/mailerController.js';
import authRouter from './routes/auth.route.js';
import path from 'path';
import dotenv from 'dotenv';
import {connectDB} from './libs/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true}
));

const __dirname = path.resolve();

app.use(express.json());
app.use('/chat/home', homeRouter);
app.use('/chat/home/data', mailerRouter);
app.use('/chat/auth', authRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}


const startServer = async () => {
  try {
    await connectDB(); // FIRST connect DB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();