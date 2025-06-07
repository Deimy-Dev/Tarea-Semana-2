import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'pong desde notifier' });
});

app.post('/notificar', (req, res) => {
  const { deviceId, taskId, mensaje } = req.body;
  console.log(`📲 Notificación enviada al dispositivo ${deviceId}: ${mensaje} (Tarea ${taskId})`);
  res.json({ status: 'ok' });
});

app.listen(5002, () => {
  console.log('✅ Servicio notificador escuchando en el puerto 5002');
});
