const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',  // MySQL 호스트
  user: 'root',       // MySQL 사용자
  password: 'dkdlvhs4!', // MySQL 비밀번호
  database: 'todo_db' // 사용할 데이터베이스 이름
});

// MySQL 연결 확인
db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL에 연결되었습니다.');
  }
});

// 할 일 목록 가져오기 API
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM todos';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// 할 일 목록 추가 API
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const sql = 'INSERT INTO todos (text, completed) VALUES (?, ?)';
  db.query(sql, [text, false], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, text, completed: false });
    }
  });
});

// 할 일 완료 상태 토글 API
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const sql = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.query(sql, [completed, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});