// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  GCP_PROJECT_ID: string;
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  GCP_PROJECT_ID: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  gcpProjectId: envVars.GCP_PROJECT_ID,

};
