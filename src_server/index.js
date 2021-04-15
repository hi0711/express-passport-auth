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
const flash = require('connect-flash');
const fs = require('fs');
const https = require('https');

// helmet
if (app.get('env') === 'production') {
    app.use(require('helmet')());
}

// webpack
if (app.get('env') === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const devServerEnabled = true;
    const config = require('../webpack.config.dev.js');

    if (devServerEnabled) {
        config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());

        const compiler = webpack(config);

        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath
        }));

        app.use(webpackHotMiddleware(compiler));
    }
}

// logging
app.use(require('morgan')('combined'));

// express.json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// port
const PORT = process.env.PORT_NO ?? 80;

// cors
const cors = require('cors');
const PROTOCOL = process.env.PROTOCOL ?? 'https://';
const DOMAIN = PROTOCOL + process.env.HOST;
app.use(cors({
    origin: DOMAIN + ':' + PORT,
    credentials: true,
    optionSuccessStatus: 200
}));

// views engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// static
const jsAssetPath = path.join(__dirname, '../views/dist/js');
app.use('/dist/js', express.static(jsAssetPath));

// connect-flashの定義
app.use(flash());

// sessionの設定
const maxage = 60 * 60 * 1000 * 24 * 3; // 3days
let sess = {
    secret: ['wedding party', 'suggar pepper sparkle'],
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: maxage,
    }
}
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

// passportの定義
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// secretの定義
const SECRET = bcrypt.hashSync(process.env.DEFAULT_SECRET, 10);

// strategiesの定義
passport.use(new LocalStrategy(
    (username, password, done) => {
        // ユーザー名が不正な時
        if (!username) {
            return done(null, false, {
                message: 'ユーザー名を入力してください。'
            });
        }
        // パスワードが不正な時
        if (!bcrypt.compareSync(password, SECRET)) {
            return done(null, false, {
                message: '正しいパスワードを入力してください。'
            });
        }
        return done(null, username)
    })
);

// serialize
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

// Router
const indexRouter = require(path.join(__dirname, '../routes/index'));
const usersRouter = require(path.join(__dirname, '../routes/users'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 共通 - ログアウトのルーティング
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// server
const httpsOptions = {
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/certificate.pem')
}

if (app.get('env') === 'development') {
    const server = https.createServer(httpsOptions, app)
        .listen(PORT, () => {
            console.info('listen: ', PORT)
        });
} else {
    app.listen(PORT, () => {
        console.info('listen: ', PORT)
    });
}
