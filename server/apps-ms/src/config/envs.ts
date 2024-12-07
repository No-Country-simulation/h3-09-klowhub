// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  APP_PORT: number;
  APP_HOST: string;
  GCP_PROJECT_ID: string;
  BUCKETNAME: string;
}

const envSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  APP_HOST: Joi.string().required(),
  GCP_PROJECT_ID: Joi.string().required(),
  BUCKETNAME: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.APP_PORT,
  host: envVars.APP_HOST,
  gcpProjectId: envVars.GCP_PROJECT_ID,
  googleBucketName: envVars.BUCKETNAME

};
