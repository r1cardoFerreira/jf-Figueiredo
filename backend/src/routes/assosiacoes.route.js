const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/associacoes', associacoesController.createAssociacao);
router.get('/associacoes', associacoesController.getAllAssociacao);

module.exports = router;
