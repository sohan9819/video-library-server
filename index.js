import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* Routes */
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import videoRoutes from './routes/videos.js';
import authRoutes from './routes/auth.js';

import cookieParser from 'cookie-parser';

const PORT = 3000;
const HOST = 'localhost';

const app = express();
dotenv.config();

const connect = () => {
  // mongoose
  //   .connect(process.env.MONGO)
  //   .then(() => {
  //     console.log('Connect to DB 👍');
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  mongoose.connect(process.env.MONGO, (error) => {
    error
      ? console.log('Database Connection Error 👎', error)
      : console.log('Connected to Database 👍');
  });
};

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, HOST, () => {
  connect();
  console.log(
    `Connected to server \nProject is running at http://${HOST}:${PORT}/`
  );
});
