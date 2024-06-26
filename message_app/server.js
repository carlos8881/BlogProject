const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//cd F:\WebProject1_202405\message_app
//cd C:\Program Files\MySQL\MySQL Server 8.0\bin
// 保留的MySQL连接配置
//mysql -h carlosblogdatabase.c7usy6yuubcb.ap-northeast-1.rds.amazonaws.com -u admin -p carlosblogdatabase < comments_db.sql
const db = mysql.createConnection({
    host: 'carlosblogdatabase.c7usy6yuubcb.ap-northeast-1.rds.amazonaws.com', // RDS实例的终端节点
    user: 'admin', // RDS数据库的主用户名
    password: 'Boyqrex123', // RDS数据库的密码
    database: 'carlosblogdatabase'
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