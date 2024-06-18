const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL 连接配置
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
    // 從請求體中獲取留言數據
    const { text, date, username, avatar } = req.body;
    // 將留言數據插入到MySQL數據庫中
    // ...
    // 返回成功響應
    res.status(200).send('Comment added successfully');
});

app.get('/comments', (req, res) => {
    // 從MySQL數據庫中檢索留言數據
    // ...
    // 返回留言數據
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});