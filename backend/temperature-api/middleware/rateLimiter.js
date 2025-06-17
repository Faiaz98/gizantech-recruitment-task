const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 100, // max requests per second
    message: {
        status: 429,
        message: 'Too many requests. Please try again later.'
    }
});

module.exports = limiter;