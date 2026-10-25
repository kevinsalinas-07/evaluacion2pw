function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Número aleatorio entre 1 y 100 en memoria
  let numeroSecreto = generarNumeroAleatorio();
  
  // POST /guess
  const verificarIntento = (req, res) => {
    const numeroCliente = Number(req.body.numero);
  
    if (Number.isNaN(numeroCliente) || numeroCliente < 1 || numeroCliente > 100) {
      return res.status(400).json({ error: 'Ingresa un número válido entre 1 y 100' });
    }
  
    let resultado = '';
    let gano = false;
  
    if (numeroSecreto > numeroCliente) {
      resultado = 'mayor';
    } else if (numeroSecreto < numeroCliente) {
      resultado = 'menor';
    } else {
      resultado = 'correcto';
      gano = true;
    }
  
    return res.json({
      resultado,
      mensaje:
        resultado === 'correcto'
          ? `¡Correcto! El número oculto era ${numeroSecreto}.`
          : `El número oculto es ${resultado} que ${numeroCliente}.`,
      gano
    });
  };
  
  // POST /reset
  const reiniciarJuego = (req, res) => {
    numeroSecreto = generarNumeroAleatorio();
    return res.json({
      mensaje: 'Partida reiniciada con un nuevo número secreto.'
    });
  };
  
  module.exports = {
    verificarIntento,
    reiniciarJuego
  };