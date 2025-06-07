import express from 'express';
import { Worker } from 'worker_threads';
import axios from 'axios';
import { randomUUID } from 'crypto';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'pong desde processor' });
});

app.post('/procesar', async (req, res) => {
  const taskId = randomUUID();
  console.log(`Tarea ${taskId} recibida.`);

  const worker = new Worker('./worker.js', {
    workerData: { taskId }
  });

  worker.on('message', async (result) => {
    console.log(`Tarea ${taskId} completada.`);

    // ✅ Enviar notificación al servicio notifier
    try {
      const response = await axios.post('http://notifier:5002/notificar', {
        deviceId: '1234',
        taskId,
        mensaje: `La tarea ${taskId} ha finalizado correctamente.`,
      });
      console.log('Notificación enviada:', response.data);
    } catch (error) {
      console.error('Error al notificar:', error.message);
    }
  });

  worker.on('error', (err) => console.error('Error en worker:', err));
  worker.on('exit', (code) => {
    if (code !== 0) console.error(`Worker finalizó con código ${code}`);
  });

  res.json({ message: `Tarea ${taskId} en ejecución.` });
});

app.listen(PORT, () => {
  console.log(`Processor en http://localhost:${PORT}`);
});
