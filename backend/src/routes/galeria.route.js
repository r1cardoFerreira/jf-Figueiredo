const express = require('express');
const galeriaController = require('../controllers/galeria.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/', upload.array('media', 10), galeriaController.createGaleria);
router.get('/', galeriaController.getAllGaleria);

module.exports = router;