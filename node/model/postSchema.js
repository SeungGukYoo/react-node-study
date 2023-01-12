//기존의 일반 DB (Oracle, MySQL, MariaDB)는 테이블 형식, SQL표준 명령어에 의해서 crud구현
//mongoDB : 자바스크립트의 객체형태로 데이터를 저장하는 구조, NoSQL, 자바스크립트 명령어로 crud구현
//스키마 : 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	communityNum:Number
},{collection:'Posts'});

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
