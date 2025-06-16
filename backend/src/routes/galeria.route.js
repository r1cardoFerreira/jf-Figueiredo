const express = require('express');
const galeriaController = require('../controllers/galeria.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/galeria', upload.array('media', 10), galeriaController.createGaleria);
router.get('/galeria', galeriaController.getAllGaleria);

module.exports = router;