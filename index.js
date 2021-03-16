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

// logging
app.use(require('morgan')('combined'));

// express.json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// sessionの設定
var sess = {
    secret: 'wedding party',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

// passportの定義
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// Router
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// server
const PORT = process.env.PORT_NO || 80;
app.listen(PORT, () => {
    console.info('listen: ', PORT)
});

// secretの定義
// const SECRET = bcrypt.hashSync(process.env.DEFAULT_SECRET, 10),
//     SECRET_COMPARE = bcrypt.compareSync(password, SECRET);
const SECRET = process.env.DEFAULT_SECRET;

// strategiesの定義
passport.use(new LocalStrategy(
    function (username, password, done) {
        process.nextTick(function () {
            // ユーザー名、パスワードが不正な時
            if (!username) {
                return done(null, false, {
                    message: 'User name is incorrect!'
                });
            } else if (password !== SECRET) {
                return done(null, false, {
                    message: 'Password is incorrect!'
                });
            } else {
                console.log('username: ' + username)
                return done(null, username)
            }
        });
    })
);

