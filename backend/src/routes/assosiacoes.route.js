const express = require('express');
const associacoesController = require('../controllers/associacoes.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

const {authenticate} = require('../middlewares/auth');

router.post('/',authenticate, upload.single('media'), associacoesController.createAssociacao);
router.get('/', associacoesController.getAllAssociacao);
router.get('/:id', associacoesController.getAssociacaoId);
router.delete('/:id',authenticate, associacoesController.deleteAssociacaoId);
router.patch('/:id',authenticate, upload.array('media', 10), associacoesController.updateAssociacao)

module.exports = router;
