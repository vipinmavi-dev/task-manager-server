const express = require('express');
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});