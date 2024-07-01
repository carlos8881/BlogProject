require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const PORT = process.env.PORT || 3000;

//cd F:\WebProject1_202405\message_app
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 连接数据库
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
    } else {
      console.log('Database connected successfully');
      client.release();
    }
  });
  

app.use(cors());
app.use(bodyParser.json());

app.post('/comments', async (req, res) => {
    const { guestComment, dateTime, guestName, guestAvatar, pageId } = req.body;
    try {
        console.log('Received data:', { guestComment, dateTime, guestName, guestAvatar, pageId });
        const result = await pool.query(
            'INSERT INTO comments (guestcomment, datetime, guestname, guestavatar, pageId) VALUES ($1, $2, $3, $4, $5)',
            [guestComment, dateTime, guestName, guestAvatar, pageId]
        );
        console.log('Insert result:', result);
        res.status(201).send();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error inserting comment');
    }
});

app.get('/comments', async (req, res) => {
  try {
      const results = await pool.query('SELECT * FROM comments');
      // 确保这里的字段名与数据库中的字段名一致
      const comments = results.rows.map(row => ({
          guestComment: row.guestcomment,
          dateTime: row.datetime,
          guestName: row.guestname,
          guestAvatar: row.guestavatar,
          pageId: row.pageid
      }));
      res.json(comments);
  } catch (err) {
      console.error('Error fetching comments:', err);
      res.status(500).send('Error fetching comments');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});