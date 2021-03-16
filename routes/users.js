const express = require('express');
const router = express.Router();

// ログイン判定
function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/')
    }
}

// usersのルーティング
router.get('/', isAuthenticated, function (req, res) {
    res.render('users')
});

module.exports = router;

