const express = require('express');
const eventosController = require('../controllers/eventos.controller');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/evento', eventosController.createEvento);
router.get('/evento', eventosController.getAllEvento);
router.get('/evento/:tipo', eventosController.getEventoTipo);
router.patch('/evento/:id', eventosController.updateEvento)

module.exports = router;
