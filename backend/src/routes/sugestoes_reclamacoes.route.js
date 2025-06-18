const express = require('express');
const SRController = require('../controllers/sugestoes_reclamacoes.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/Sugestoes_Reclamacoes', upload.array('media', 10), SRController.createSugestoes_Reclamacoes);
router.get('/Sugestoes_Reclamacoes', SRController.getAllSugestoes_Reclamacoes);

module.exports = router;