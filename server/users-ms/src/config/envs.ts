// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET
};
