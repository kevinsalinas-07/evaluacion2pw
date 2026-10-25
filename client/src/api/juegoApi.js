const API_URL = 'http://localhost:3000';

export const enviarIntentoApi = async (numero) => {
  const res = await fetch(`${API_URL}/guess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numero: Number(numero) })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const reiniciarJuegoApi = async () => {
  const res = await fetch(`${API_URL}/reset`, { method: 'POST' });
  return await res.json();
};