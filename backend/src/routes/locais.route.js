const express = require('express');
const locaisController = require('../controllers/locais.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

// const {authenticate} = require('../middlewares/autent.middleware');


router.post('/', upload.array('media', 10), locaisController.createLocal);
router.get('/', locaisController.getAllLocais);
router.delete('/:id', locaisController.deleteLocalId);
router.get('/tipo/:tipo', locaisController.getLocaisTipo);
router.get('/:id', locaisController.getLocalId);
router.patch('/:id', upload.array('media', 10), locaisController.updateLocal);


module.exports = router;