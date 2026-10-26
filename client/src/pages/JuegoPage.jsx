import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Input, Button, Alert, Badge } from 'reactstrap';
import { enviarIntentoApi, reiniciarJuegoApi } from '../api/juegoApi';

export default function JuegoPage() {
  const [numeroInput, setNumeroInput] = useState('');
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('Ingresa un número entre 1 y 100.');
  const [gano, setGano] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!numeroInput) return;

    try {
      const data = await enviarIntentoApi(numeroInput);
      setMensaje(data.mensaje);
      setGano(data.gano);
      setHistorial([...historial, { numero: Number(numeroInput), resultado: data.resultado }]);
      setNumeroInput('');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const manejarReset = async () => {
    try {
      const data = await reiniciarJuegoApi();
      setHistorial([]);
      setGano(false);
      setNumeroInput('');
      setMensaje(data.mensaje);
    } catch (error) {
      setMensaje('Error al reiniciar el juego.');
    }
  };

  return (
    <Card className="shadow-sm">
      <CardBody>
        <CardTitle tag="h4" className="fw-bold mb-3">
          Ejercicio 1: Adivina el Número (1 - 100)
        </CardTitle>

        <Alert color={gano ? 'success' : 'info'}>{mensaje}</Alert>

        <Form onSubmit={manejarEnvio} className="d-flex gap-2 mb-4">
          <FormGroup className="mb-0 flex-grow-1">
            <Input
              type="number"
              min="1"
              max="100"
              placeholder="Escribe un número..."
              value={numeroInput}
              onChange={(e) => setNumeroInput(e.target.value)}
              disabled={gano}
            />
          </FormGroup>
          <Button color="primary" type="submit" disabled={gano}>
            Intentar
          </Button>
          <Button color="secondary" type="button" outline onClick={manejarReset}>
            Reiniciar
          </Button>
        </Form>

        <h6 className="fw-bold">Historial de intentos:</h6>
        {historial.length === 0 ? (
          <p className="text-muted mb-0">Sin intentos registrados.</p>
        ) : (
          <ul className="mb-0">
            {historial.map((item, index) => (
              <li key={index} className="mb-1">
                Intento #{index + 1}: <strong>{item.numero}</strong> — El oculto es{' '}
                <Badge color={item.resultado === 'correcto' ? 'success' : 'secondary'}>
                  {item.resultado}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}