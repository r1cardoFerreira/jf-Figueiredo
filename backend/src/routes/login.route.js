const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');
const {limitadorLogin} = require('../middlewares/limitadorlogin');


router.post('/login',limitadorLogin, loginController.login);

module.exports = router;