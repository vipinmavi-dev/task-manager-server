import 'dotenv/config';

import express from 'express';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json()); // If Request body contain JSON data then parse
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});