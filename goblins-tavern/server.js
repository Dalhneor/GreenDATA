const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database/boardgames.sqlite');
const PORT = 3000;

app.use(express.static('HTML'));

// Example: get all games
app.get('/api/boardgames', (req, res) => {
  const query = `
    SELECT 
      bg.*,
      r.users_rated,
      r.average
    FROM Board_Game bg
    LEFT JOIN Rating r ON bg.id_bg = r.id_rating
    LIMIT 100
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

