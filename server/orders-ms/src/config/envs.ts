import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  ORDER_PORT: number;
  ORDER_HOST: string;

  APP_PORT: number;
  APP_HOST: string;

  COURSE_PORT: number;
  COURSE_HOST: string;

  PAYMENT_PORT: number;
  PAYMENT_HOST: string;
}

const envSchema = joi
  .object({
    ORDER_PORT: joi.number().required(),
    ORDER_HOST: joi.string().required(),

    APP_PORT: joi.number().required(),
    APP_HOST: joi.string().required(),

    COURSE_PORT: joi.number().required(),
    COURSE_HOST: joi.string().required(),

    PAYMENT_PORT: joi.number().required(),
    PAYMENT_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.ORDER_PORT,
  host: envVars.ORDER_HOST,

  appPort: envVars.APP_PORT,
  appHost: envVars.APP_HOST,

  coursePort: envVars.COURSE_PORT,
  courseHost: envVars.COURSE_HOST,

  paymentPort: envVars.PAYMENT_PORT,
  paymentHost: envVars.PAYMENT_HOST
};
