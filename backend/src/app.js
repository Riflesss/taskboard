const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const { initDb } = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

initDb().catch((error) => {
  console.error('Database initialization failed:', error);
  process.exit(1);
});

module.exports = app;
