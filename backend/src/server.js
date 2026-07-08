import express from 'express';
import cors from 'cors';
import homeRouter from './routes/home.js';
import mailerRouter from './routes/mailer.route.js';
import authRouter from './routes/auth.route.js';
import path from 'path';
import {ENV} from './libs/env.js';
import {connectDB} from './libs/db.js';
import cookieParser from 'cookie-parser';
import messageRouter from './routes/message.route.js';
import {app, server} from './libs/socket.js';

const PORT = ENV.PORT;


const __dirname = path.resolve();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/chat/home', homeRouter);
app.use('/chat/mailer', mailerRouter);
app.use('/chat/auth', authRouter);
app.use('/chat/message', messageRouter);

if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}


const startServer = async () => {
  try {
    await connectDB(); // FIRST connect DB
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();