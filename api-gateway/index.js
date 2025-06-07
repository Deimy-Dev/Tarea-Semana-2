import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong desde api-gateway' });
});


app.post('/api/facturar', async (req, res) => {
  try {
    // Se envia la tarea al microservicio processor
    const { data } = await axios.post('http://nginx/procesar', req.body);
    res.json({
      status: 'Tarea enviada al procesador',
      resultado: data
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error comunicándose con el servicio processor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en puerto ${PORT}`);
});
