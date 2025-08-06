const express = require('express');
const eventosController = require('../controllers/eventos.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

const {authenticate} = require('../middlewares/auth');


router.post('/',authenticate,  upload.array('media', 10), eventosController.createEvento);
router.get('/', eventosController.getEventos);
router.get('/tipo/:tipo', eventosController.getEventoTipo);
router.get('/:id', eventosController.getEventoId);
router.patch('/:id',authenticate, upload.array('media', 10), eventosController.updateEvento);
// router.get('/recentes', eventosController.getMaxSeisEventos);
router.delete('/:id',authenticate, eventosController.deleteEvento);
module.exports = router;
