const express = require('express');
const router = express.Router();

// usersのルーティング
router.get('/', function (req, res, next) {
    res.render('users')
});

module.exports = router;

