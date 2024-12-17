// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  USER_PORT: number;
  USER_HOST: string;
  JWT_SECRET: string;

  PAYMENT_PORT: number;
  PAYMENT_HOST: string;
}

const envSchema = Joi.object({
  USER_PORT: Joi.number().required(),
  USER_HOST: Joi.string().required(),

  PAYMENT_PORT: Joi.number().required(),
  PAYMENT_HOST: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  userPort: envVars.USER_PORT,
  userHost: envVars.USER_HOST,

  paymentPort: envVars.PAYMENT_PORT,
  paymentHost: envVars.PAYMENT_HOST,

  jwtSecret: envVars.JWT_SECRET
};
