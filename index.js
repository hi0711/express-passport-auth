// dotenv読み込み
require('dotenv').config();

// 必要なモジュール
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// server
const PORT = process.env.PORT_NO || 80;
app.listen(PORT, () => {
    console.info('listen: ', PORT)
});

// render
app.get('/', function (req, res) {
    res.render('index')
})

