// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  USER_PORT: number;
  JWT_SECRET: string;
}

const envSchema = Joi.object({
  USER_PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  userPort: envVars.USER_PORT,
  jwtSecret: envVars.JWT_SECRET
};