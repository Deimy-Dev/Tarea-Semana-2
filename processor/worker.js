import { parentPort, workerData } from 'worker_threads';

function simulateHeavyTask() {
  // Simular trabajo pesado (2 segundos)
  const start = Date.now();
  while (Date.now() - start < 2000) {}
}

simulateHeavyTask();
parentPort.postMessage({ taskId: workerData.taskId });
