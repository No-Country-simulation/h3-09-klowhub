// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  COURSES_PORT: number;
  COURSES_HOST: string; 
}

const envSchema = Joi.object({
  COURSES_PORT: Joi.number().required(),
  COURSES_HOST: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.COURSES_PORT,
  host: envVars.COURSES_HOST
};
