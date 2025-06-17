const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const rateLimiter = require('./middleware/rateLimiter');
const temperatureRoute = require('./routes/temperature');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('combined')); // request logging

// Route
app.use('/temperature', rateLimiter, temperatureRoute);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});