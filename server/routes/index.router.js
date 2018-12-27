const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/inicio',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/', ctrlUser.getUsuarios);
router.get('/:id', ctrlUser.obtenerUsuario);
router.put('/:id', ctrlUser.EditarUsuario);
router.delete('/:id', ctrlUser.BorrarUsuario);

module.exports = router;



