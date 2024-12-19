import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PAYMENT_PORT: number;
  PAYMENT_HOST: string;

  ORDER_PORT: number;
  ORDER_HOST: string;

  STRIPE_SECRET_KEY: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENPOINT_SECRET: string;
}

const envSchema = joi
  .object({
    PAYMENT_PORT: joi.number().required(),
    PAYMENT_HOST: joi.string().required(),

    ORDER_PORT: joi.number().required(),
    ORDER_HOST: joi.string().required(),

    STRIPE_SECRET_KEY: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENPOINT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  paymentPort: envVars.PAYMENT_PORT,
  paymnetHost: envVars.PAYMENT_HOST,

  orderPort: envVars.ORDER_PORT,
  orderHost: envVars.ORDER_HOST,

  stripeSecretKey: envVars.STRIPE_SECRET_KEY,

  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeEnpointSecret: envVars.STRIPE_ENPOINT_SECRET,
};
