const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const temperature = parseFloat((Math.random() * (45 - 15) + 15).toFixed(2));

    const response = {
        temperature,
        unit: 'Celsius',
        timestamp: new Date().toISOString()
    };

    res.json(response);
});

module.exports = router;