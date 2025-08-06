const express = require('express');
const galeriaController = require('../controllers/galeria.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

const {authenticate} = require('../middlewares/auth');


router.post('/',authenticate, upload.array('media', 10), galeriaController.createGaleria);
router.get('/', galeriaController.getAllGaleria);
router.delete('/:id',authenticate, galeriaController.deleteGaleriaId);

module.exports = router;