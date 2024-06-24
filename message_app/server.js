const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//cd F:\WebProject1_202405\message_app
// 保留的MySQL连接配置
const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser', // 替换为您的 MySQL 用户名
    password: 'Boyqrex123', // 替换为您的 MySQL 密码
    database: 'comments_db'
});

// 连接数据库
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/comments', (req, res) => {
    const comment = req.body;
    db.query('INSERT INTO comments SET ?', comment, (err, result) => {
        if (err) throw err;
        res.status(201).send();
    });
});

app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments', (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            res.status(500).send('Error fetching comments');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});