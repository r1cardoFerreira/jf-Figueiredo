const express = require('express');
const locaisController = require('../controllers/locais.controller');
const upload = require('../middlewares/uploads');

const router = express.Router();

const {authenticate} = require('../middlewares/auth');


router.post('/',authenticate, upload.array('media', 10), locaisController.createLocal);
router.get('/', locaisController.getAllLocais);
router.get('/tipo/', locaisController.getLocais);
router.delete('/:id',authenticate, locaisController.deleteLocalId);
// router.get('/tipo/:tipo', locaisController.getLocaisTipo);
router.get('/:id', locaisController.getLocalId);
router.patch('/:id',authenticate, upload.array('media', 10), locaisController.updateLocal);


module.exports = router;