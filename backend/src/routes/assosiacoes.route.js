const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/', upload.array('media', 10), associacoesController.createAssociacao);
router.get('/', associacoesController.getAllAssociacao);
router.get('/:id', associacoesController.getAssociacaoId);

module.exports = router;
