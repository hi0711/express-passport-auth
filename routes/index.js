const express = require('express');
const router = express.Router();
const passport = require('passport');

// indexのルーティング
router.get('/', function(req, res) {
    res.render('login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
    session: true
}))

module.exports = router;

