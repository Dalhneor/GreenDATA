const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database/boardgames.sqlite');
const PORT = 3000;


app.use(cors());
app.use(express.static('HTML'));
app.use(express.json());


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


app.post('/api/search', (req, res) => {
  const { year, minPlayers, maxPlayers, playtime, keywords } = req.body;

  let query = `SELECT * FROM Board_Game WHERE 1=1`;
  const params = [];


  if (year) {
    if (year === "one") query += ` AND yearpublished < 2000`;
    if (year === "two") query += ` AND yearpublished BETWEEN 2000 AND 2010`;
    if (year === "three") query += ` AND yearpublished BETWEEN 2010 AND 2020`;
    if (year === "four") query += ` AND yearpublished >= 2020`;
  }

  if (minPlayers) {
    if (minPlayers === "one") query += ` AND minplayers = 1`;
    if (minPlayers === "two") query += ` AND minplayers <= 2`;
    if (minPlayers === "three") query += ` AND minplayers <= 4`;
    if (minPlayers === "four") query += ` AND minplayers <= 6`;
  }

  if (maxPlayers) {
    if (maxPlayers === "one") query += ` AND maxplayers <= 2`;
    if (maxPlayers === "two") query += ` AND maxplayers <= 4`;
    if (maxPlayers === "three") query += ` AND maxplayers <= 6`;
    if (maxPlayers === "four") query += ` AND maxplayers <= 8`;
    if (maxPlayers === "five") query += ` AND maxplayers <= 12`;
  }

  if (playtime) {
    if (playtime === "one") query += ` AND playingtime <= 20`;
    if (playtime === "two") query += ` AND playingtime <= 60`;
    if (playtime === "three") query += ` AND playingtime > 60`;
    if (playtime === "four") query += ` AND playingtime > 120`;
    if (playtime === "five") query += ` AND playingtime > 180`;
  }

  if (keywords && keywords.length > 0) {
    keywords.forEach(kw => {
      query += ` AND (name LIKE ? OR description LIKE ?)`;
      params.push(`%${kw}%`, `%${kw}%`);
    });
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server ready at http://localhost:${PORT}`);
});
