const API_URL = 'http://localhost:3000/api';

const verificarRespuesta = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
};

export const obtenerMenuApi = async () => {
  const res = await fetch(`${API_URL}/menu`);
  return verificarRespuesta(res);
};

export const obtenerReservaApi = async () => {
  const res = await fetch(`${API_URL}/reserva`);
  return verificarRespuesta(res);
};

export const agregarPlatoApi = async (alimentoId, cantidad = 1) => {
  const res = await fetch(`${API_URL}/reserva/agregar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ alimentoId, cantidad })
  });
  return verificarRespuesta(res);
};

export const actualizarPorcionesApi = async (id, cantidad) => {
  const res = await fetch(`${API_URL}/reserva/actualizar-porciones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad })
  });
  return verificarRespuesta(res);
};

export const eliminarPlatoApi = async (id) => {
  const res = await fetch(`${API_URL}/reserva/eliminar/${id}`, {
    method: 'DELETE'
  });
  return verificarRespuesta(res);
};

export const reiniciarReservaApi = async () => {
  const res = await fetch(`${API_URL}/reserva/reiniciar`, { method: 'POST' });
  return verificarRespuesta(res);
};

export const confirmarReservaApi = async () => {
  const res = await fetch(`${API_URL}/reserva/confirmar`, { method: 'POST' });
  return verificarRespuesta(res);
};