import 'dotenv/config';

import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

import sequelize from './configs/sequalize.js';
import User from './models/Users.model.js';
import AuthType from './models/AuthTypes.model.js';
(async () => {
  try {
    // await sequelize.sync({ alter: true }); // good for development
    await sequelize.sync(); // good for development
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
})();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // If Request body contain JSON data then parse
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});