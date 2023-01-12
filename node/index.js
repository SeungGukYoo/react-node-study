const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5500;

//express에서 react의 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

//클라이언트에서 보내는 데이터를 받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/community', require('./router/communityRouter'));

//MongoDB 접속
app.listen(port, () => {
  mongoose
    .connect('mongodb+srv://MyApp:abc1234@study.ujm7zx6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log(`Server app listening on Port ${port} with MongoDB`))
    .catch((err) => console.log(err));
});

//기본 라우터 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
