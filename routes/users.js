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
router.get('/', isAuthenticated, (req, res) => {
    res.render('users', {USER: req.user})
});

module.exports = router;

