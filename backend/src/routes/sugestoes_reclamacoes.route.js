const express = require('express');
const SRController = require('../controllers/sugestoes_reclamacoes.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/', upload.array('media', 10), SRController.createSugestoes_Reclamacoes);
router.get('/', SRController.getAllSugestoes_Reclamacoes);
router.delete('/:id', SRController.deleteSugestoes_ReclamacoesId);

module.exports = router;