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
app.set('view engine', 'pug');

// server
const PORT = process.env.PORT_NO || 80;
app.listen(PORT, () => {
    console.info('listen: ', PORT)
});

// render
app.get('/', function (req, res) {
    res.render('login')
});

// secretとuserの定義
const SECRET = bcrypt.hashSync(process.env.DEFAULT_SECRET, 10),
    USER = bcrypt.hashSync(process.env.DEFAULT_USER, 10);

// sessionの設定
var sess = {
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

// passportの定義
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

// strategiesの定義
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    process.nextTick(function () {
        // ユーザー名、パスワードが不正な時
        if (!username) {
            return done(null, false, {
                message: 'User name is incorrect!'
            });
        } else if (password !== result[0].password) {
            return done(null, false, {
                message: 'Password is incorrect!'
            });
        } else {
            console.log('username: ' + username)
            return done(null, username)
        }
    });
}));

