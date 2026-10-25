function obtenerMenuInicial() {
    return [
      { id: 101, nombre: 'Menú Ejecutivo (Pollo)', precio: 5.50, stock: 12, categoria: 'Fuerte' },
      { id: 102, nombre: 'Pasta Alfredo', precio: 4.50, stock: 8, categoria: 'Pasta' },
      { id: 103, nombre: 'Ensalada César', precio: 3.50, stock: 5, categoria: 'Entrada' },
      { id: 104, nombre: 'Bebida Natural', precio: 1.50, stock: 15, categoria: 'Bebida' }
    ];
  }
  
  function obtenerReservaInicial() {
    return {
      saldo: 25.00,
      itemsReservados: [],
      total: 0.00
    };
  }
  
  // Estado en memoria del menú y la reserva activa
  let menu = obtenerMenuInicial();
  let reserva = obtenerReservaInicial();
  
  // 1. GET /api/menu
  const obtenerMenu = (req, res) => {
    return res.json(menu);
  };
  
  // 2. GET /api/reserva
  const obtenerReserva = (req, res) => {
    return res.json(reserva);
  };
  
  // 3. POST /api/reserva/agregar
  const agregarPlato = (req, res) => {
    const idRecibido = req.body.alimentoId !== undefined ? req.body.alimentoId : req.body.alimentold;
    const alimentoId = Number(idRecibido);
    const cantidad = Number(req.body.cantidad);
  
    const plato = menu.find((item) => item.id === alimentoId);
    if (!plato) {
      return res.status(404).json({ error: 'Platillo no encontrado' });
    }
  
    if (plato.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }
  
    const costo = Number((plato.precio * cantidad).toFixed(2));
    if (costo > reserva.saldo) {
      return res.status(400).json({ error: 'Saldo insuficiente para esta cantidad' });
    }
  
    const indice = reserva.itemsReservados.findIndex((item) => item.id === alimentoId);
    if (indice !== -1) {
      reserva.itemsReservados[indice].cantidad += cantidad;
    } else {
      reserva.itemsReservados.push({ id: alimentoId, cantidad });
    }
  
    plato.stock -= cantidad;
    reserva.total = Number((reserva.total + costo).toFixed(2));
    reserva.saldo = Number((reserva.saldo - costo).toFixed(2));
  
    return res.json(reserva);
  };
  
  // 4. PUT /api/reserva/actualizar-porciones/:id
  const actualizarPorciones = (req, res) => {
    const alimentoId = Number(req.params.id);
    const nuevaCantidad = Number(req.body.cantidad);
  
    const platoEnMenu = menu.find((item) => item.id === alimentoId);
    const itemEnCarrito = reserva.itemsReservados.find((item) => item.id === alimentoId);
  
    if (!platoEnMenu || !itemEnCarrito) {
      return res.status(404).json({ error: 'Platillo no encontrado en la reserva' });
    }
  
    const diferencia = nuevaCantidad - itemEnCarrito.cantidad;
    const costoDiferencia = Number((diferencia * platoEnMenu.precio).toFixed(2));
  
    if (diferencia > 0) {
      if (costoDiferencia > reserva.saldo) {
        return res.status(400).json({ error: 'Saldo insuficiente para esta cantidad' });
      }
      if (diferencia > platoEnMenu.stock) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
    }
  
    platoEnMenu.stock -= diferencia;
    reserva.saldo = Number((reserva.saldo - costoDiferencia).toFixed(2));
    reserva.total = Number((reserva.total + costoDiferencia).toFixed(2));
  
    if (nuevaCantidad <= 0) {
      reserva.itemsReservados = reserva.itemsReservados.filter((item) => item.id !== alimentoId);
    } else {
      itemEnCarrito.cantidad = nuevaCantidad;
    }
  
    return res.json(reserva);
  };
  
  // 5. DELETE /api/reserva/eliminar/:id
  const eliminarPlato = (req, res) => {
    const alimentoId = Number(req.params.id);
  
    const itemEnCarrito = reserva.itemsReservados.find((item) => item.id === alimentoId);
    const platoEnMenu = menu.find((item) => item.id === alimentoId);
  
    if (!itemEnCarrito || !platoEnMenu) {
      return res.status(404).json({ error: 'El platillo no está en la reserva' });
    }
  
    const reembolso = Number((itemEnCarrito.cantidad * platoEnMenu.precio).toFixed(2));
  
    platoEnMenu.stock += itemEnCarrito.cantidad;
    reserva.saldo = Number((reserva.saldo + reembolso).toFixed(2));
    reserva.total = Math.max(0, Number((reserva.total - reembolso).toFixed(2)));
    reserva.itemsReservados = reserva.itemsReservados.filter((item) => item.id !== alimentoId);
  
    return res.json(reserva);
  };
  
  // POST /api/reserva/reiniciar
  const reiniciarReserva = (req, res) => {
    menu = obtenerMenuInicial();
    reserva = obtenerReservaInicial();
    return res.json({ menu, reserva });
  };
  
  // POST /api/reserva/confirmar
  const confirmarReserva = (req, res) => {
    if (reserva.itemsReservados.length === 0) {
      return res.status(400).json({ error: 'La bandeja de reserva está vacía' });
    }
  
    reserva.itemsReservados = [];
    reserva.total = 0.00;
    return res.json({ mensaje: '¡Reserva confirmada con éxito!', reserva });
  };
  
  module.exports = {
    obtenerMenu,
    obtenerReserva,
    agregarPlato,
    actualizarPorciones,
    eliminarPlato,
    reiniciarReserva,
    confirmarReserva
  };