const express = require('express');
const router = express.Router();

const emplo = require('../controllers/employee.controler');

router.get('/', emplo.getEmpleado);
router.post('/', emplo.CreateEmpleado);
router.get('/:id', emplo.obtenerEmpleado);
router.put('/:id', emplo.EditarEmpleado);
router.delete('/:id', emplo.BorrarEmpleado);

module.exports = router; 