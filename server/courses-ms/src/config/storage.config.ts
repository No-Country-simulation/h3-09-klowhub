import { Storage } from '@google-cloud/storage';
import * as path from 'path';

// Ruta al archivo JSON de la cuenta de servicio
const serviceKeyPath = path.join(
  __dirname,
  '..',
  'config',
  'service-account.json',
);

// Inicializa el cliente de Google Cloud Storage
export const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId: process.env.GCP_PROJECT_ID, // Cambia esto por tu ID de proyecto
});
