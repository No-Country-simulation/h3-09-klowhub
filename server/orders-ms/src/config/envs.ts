import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  ORDER_PORT: number;
  ORDER_HOST: string;
}

const envSchema = joi
  .object({
    ORDER_PORT: joi.number().required(),
    ORDER_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.ORDER_PORT,
  host: envVars.ORDER_HOST
};
