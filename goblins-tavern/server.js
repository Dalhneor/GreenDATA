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

app.post('/api/add', (req, res) => {
  const {
    bg_id, title, description, release_date,
    min_p, max_p, time_p, minage,
    owned, designer, wanting, artwork_url,
    publisher, category, meca_g,
    rating_id, user_rating, average_rating,
    game_extention_id, extansion_name
  } = req.body;

  if (
    !bg_id || !title || !description || !release_date ||
    min_p == null || max_p == null || time_p == null || minage == null
  ) {
    return res.status(400).json({ message: "Please fill in all mandatory fields." });
  }

  const sql = `
    INSERT OR IGNORE INTO Board_Game 
    (id_bg, name, description, yearpublished, minplayers, maxplayers, playingtime, minage, owned, wanting, img)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [bg_id, title, description, release_date, min_p, max_p, time_p, minage, owned, wanting, artwork_url], function (err) {
    if (err) {
      console.error('Error inserting Board_Game:', err.message);
      return res.status(500).json({ error: err.message });
    }

    const responses = [];

    const insertMultiple = (valuesString, insertTable, linkTable, nameColumn, linkNameColumn) => {
      if (!valuesString) return;

      const values = Array.isArray(valuesString) ? valuesString : valuesString.split(',').map(val => val.trim());
      values.forEach(value => {
        db.get(`SELECT ${nameColumn} FROM ${insertTable} WHERE ${nameColumn} = ?`, [value], (err, row) => {
          if (err) {
            console.error(`Error selecting from ${insertTable}:`, err.message);
            return;
          }

          const insertRelation = () => {
            db.run(`INSERT INTO ${linkTable} (id_bg, ${linkNameColumn}) VALUES (?, ?)`, [bg_id, value], (err) => {
              if (err) {
                console.error(`Error inserting into ${linkTable}:`, err.message);
              }
            });
          };

          if (!row) {
            db.run(`INSERT INTO ${insertTable} (${nameColumn}) VALUES (?)`, [value], (err) => {
              if (err) {
                console.error(`Error inserting into ${insertTable}:`, err.message);
                return;
              }
              insertRelation();
            });
          } else {
            insertRelation();
          }
        });
      });
    };

    insertMultiple(designer, 'BG_Designer', 'Designed_By', 'designer_name', 'designer_name');

    insertMultiple(publisher, 'BG_Publisher', 'Published_By', 'publisher_name', 'publisher_name');

    insertMultiple(category, 'BG_Category', 'Is_Of_Category', 'category_name', 'category_name');

    insertMultiple(meca_g, 'BG_Mechanic', 'Uses_Mechanic', 'mechanic_name', 'mechanic_name');

    if (rating_id && user_rating !== undefined && average_rating !== undefined) {
      db.run(`INSERT OR IGNORE INTO Rating (id_rating, users_rated, average, id_bg) VALUES (?, ?, ?, ?)`,
        [rating_id, user_rating, average_rating, bg_id]);
      responses.push('Rating inserted');
    }

    if (game_extention_id && extansion_name) {
      db.run(`INSERT OR IGNORE INTO BG_Expansion (id_bge, name, id_bg) VALUES (?, ?, ?)`,
        [game_extention_id, extansion_name, bg_id]);
      responses.push('Expansion inserted');
    }

    res.status(200).json({ message: "Board game and related data added (with multi-insertions by name)", details: responses });
  });
});


app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
