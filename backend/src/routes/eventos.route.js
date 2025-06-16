const express = require('express');
const eventosController = require('../controllers/eventos.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/evento',  upload.array('media', 10), eventosController.createEvento);
router.get('/evento', eventosController.getAllEvento);
router.get('/evento/tipo/:tipo', eventosController.getEventoTipo);
router.get('/evento/:id', eventosController.getEventoId);
router.patch('/evento/:id', eventosController.updateEvento)

module.exports = router;
