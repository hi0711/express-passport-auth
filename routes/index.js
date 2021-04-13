const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');

// indexのルーティング
router.get('/', (req, res) => {
    res.render('login', {ERROR: req.flash('error')})
});

router.post('/login',
    (req, res, next) => {
        passport.authenticate('local',
            {
                successRedirect: '/users?name=' + req.body.cropped,
                failureRedirect: '/',
                session: true,
                failureFlash: true,
                badRequestMessage: '認証エラーです。正しいユーザー名、パスワードを入力してください。',
            }
        )(req, res, next);
    }
);

module.exports = router;

