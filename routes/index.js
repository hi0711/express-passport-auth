const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');

// indexのルーティング
router.get('/', function (req, res) {
    res.render('login', {ERROR: req.flash('error')})
});

router.post('/login',
    function (req, res, next) {
        console.log(req.body);
        next();
    },
    passport.authenticate('local',
        {
            successRedirect: '/users',
            failureRedirect: '/',
            session: true,
            failureFlash: true,
            badRequestMessage: '認証エラーです。正しいユーザー名、パスワードを入力してください。',
        }
    )
);

module.exports = router;

