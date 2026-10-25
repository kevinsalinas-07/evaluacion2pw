const express = require('express');
const router = express.Router();
const {
  obtenerMenu,
  obtenerReserva,
  agregarPlato,
  actualizarPorciones,
  eliminarPlato,
  reiniciarReserva,
  confirmarReserva
} = require('../controllers/reservaController');

router.get('/menu', obtenerMenu);
router.get('/reserva', obtenerReserva);
router.post('/reserva/agregar', agregarPlato);
router.put('/reserva/actualizar-porciones/:id', actualizarPorciones);
router.delete('/reserva/eliminar/:id', eliminarPlato);

router.post('/reserva/reiniciar', reiniciarReserva);
router.post('/reserva/confirmar', confirmarReserva);

module.exports = router;