const express = require('express');
const router = express.Router();

// usersのルーティング
router.get('/users', function(req, res) {
    res.render('users')
});

module.exports = router;

