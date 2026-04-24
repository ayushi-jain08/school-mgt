require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// We mount schoolRoutes on the root so that the endpoints exactly match /addSchool and /listSchools
app.use('/', schoolRoutes);

// Health check and DB test route
const db = require('./config/db');
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'healthy', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', db: 'disconnected', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
