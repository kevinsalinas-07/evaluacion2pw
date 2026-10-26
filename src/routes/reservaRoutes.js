const express = require('express');
const router = express.Router();
const {
  obtenerMenu,
  obtenerReserva,
  agregarPlato,
  actualizarPorciones,
  eliminarPlato,
  confirmarReserva,
  resetearTurno,
  restaurarStock,
  reiniciarReserva
} = require('../controllers/reservaController');

router.get('/menu', obtenerMenu);
router.get('/reserva', obtenerReserva);
router.post('/reserva/agregar', agregarPlato);
router.put('/reserva/actualizar-porciones/:id', actualizarPorciones);
router.delete('/reserva/eliminar/:id', eliminarPlato);

router.post('/reserva/confirmar', confirmarReserva);
router.post('/reserva/reset', resetearTurno);
router.post('/reserva/restaurar-stock', restaurarStock);
router.post('/reserva/reiniciar', reiniciarReserva);

module.exports = router;