const express = require('express');
const documentosController = require('../controllers/documentos.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

const {authenticate} = require('../middlewares/auth');


router.post('/',authenticate, upload.array('media', 10), documentosController.createDocumento);
router.get('/', documentosController.getAllDocumento);
router.get('/tipo/:tipo', documentosController.getDocumentoTipo);
router.delete('/:id',authenticate, documentosController.deleteDocumentoId);

module.exports = router;
