const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');

// indexのルーティング
router.get('/', function (req, res) {
    res.render('login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
    session: true,
    failureFlash: true,
}))

module.exports = router;

