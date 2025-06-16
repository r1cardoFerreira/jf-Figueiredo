const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/associacoes', upload.array('media', 10), associacoesController.createAssociacao);
router.get('/associacoes', associacoesController.getAllAssociacao);
router.get('/associacoes/:id', associacoesController.getAssociacaoId);

module.exports = router;
