const express = require('express');
const documentosController = require('../controllers/documentos.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/documentos', upload.array('media', 10), documentosController.createDocumento);
router.get('/documentos', documentosController.getAllDocumento);
router.get('/documentos/tipo/:tipo', documentosController.getDocumentoTipo);

module.exports = router;
