const express = require('express');
const router = express.Router();

// indexのルーティング
router.get('/', function(req, res) {
    res.render('login')
});

module.exports = router;

