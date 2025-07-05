const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');

router.post('/', upload.single('media'), associacoesController.createAssociacao);
router.get('/', associacoesController.getAllAssociacao);
router.get('/:id', associacoesController.getAssociacaoId);
router.delete('/:id', associacoesController.deleteAssociacaoId);


module.exports = router;
