const express = require('express');
const cors = require('cors');

const juegoRoutes = require('./routes/juegoRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/', juegoRoutes);
app.use('/api', reservaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express activo en http://localhost:${PORT}`);
});