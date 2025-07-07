const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');

router.post('/', upload.single('media'), associacoesController.createAssociacao);
router.get('/', associacoesController.getAllAssociacao);
router.get('/:id', associacoesController.getAssociacaoId);
router.delete('/:id', associacoesController.deleteAssociacaoId);

<<<<<<< HEAD
router.post('/', upload.array('media', 10), associacoesController.createAssociacao);
router.get('/', associacoesController.getAllAssociacao);
router.get('/:id', associacoesController.getAssociacaoId);
router.delete('/:id', associacoesController.deleteAssociacaoId);
=======
>>>>>>> fad56f919b020db9804d1ad38405d2728cfd241e

module.exports = router;
