// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
 
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),

}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,

};
