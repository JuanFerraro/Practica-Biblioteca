const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Notas de BD');
});

module.exports = router;