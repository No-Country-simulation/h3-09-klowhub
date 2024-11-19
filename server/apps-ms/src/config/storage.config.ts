import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { envs } from '.';

// Ruta al archivo JSON de la cuenta de servicio
const serviceKeyPath = path.join(__dirname, './service-account.json');

// Inicializa el cliente de Google Cloud Storage
export const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId: envs.gcpProjectId, // Cambia esto por tu ID de proyecto
});
