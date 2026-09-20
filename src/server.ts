import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

import {ip} from 'address';
import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

import sequelize from './configs/sequalize.js';
import Task from './models/tasks.model.js';
import User from './models/Users.model.js';
import AuthType from './models/AuthTypes.model.js';
import TaskPriority from './models/taskPriority.model.js';
import TaskStauses from './models/taskStatus.model.js';
(async () => {
  try {
    // await sequelize.sync({ alter: true }); // good for development
    await sequelize.sync(); // good for development
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
})();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(cookieParser());
app.use(express.json()); // If Request body contain JSON data then parse
app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  let ipAddress = ip();
  console.log(`✅ Server is running at: http://localhost:${PORT} & http://${ipAddress}:${PORT}`);
});