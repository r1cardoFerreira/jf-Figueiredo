const express = require('express');
const rateLimit = require('express-rate-limit');

const limitadorLogin = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: { error: 'Muitas tentativas. Tente novamente mais tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {limitadorLogin};