const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('index');
});
module.exports = router;
