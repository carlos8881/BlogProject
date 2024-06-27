require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const PORT = process.env.PORT || 3000;

//cd F:\WebProject1_202405\message_app
//cd C:\Program Files\MySQL\MySQL Server 8.0\bin
// 保留的MySQL连接配置
//mysql -h carlosblogdatabase.c7usy6yuubcb.ap-northeast-1.rds.amazonaws.com -u admin -p carlosblogdatabase < comments_db.sql
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
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
    const { guestComment, dateTime, guestName, guestAvatar } = req.body;
    try {
        console.log('Received data:', { guestComment, dateTime, guestName, guestAvatar });
        const result = await pool.query(
            'INSERT INTO comments (guestcomment, datetime, guestname, guestavatar) VALUES ($1, $2, $3, $4)',
            [guestComment, dateTime, guestName, guestAvatar]
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
        res.json(results.rows);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).send('Error fetching comments');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});