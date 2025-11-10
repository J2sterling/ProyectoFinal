const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

app.use(cors());  // ← NUEVO
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@db:5432/mydb'
});

// Health check endpoint
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Get all users
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const { rows } = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server on port 3001 to avoid conflict
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
