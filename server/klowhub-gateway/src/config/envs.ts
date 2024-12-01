// @prefix micro
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  USERS_MICROSERVICE_HOST: string;
  USERS_MICROSERVICE_PORT: number;

  PAYMENTS_MICROSERVICE_HOST: string;
  PAYMENTS_MICROSERVICE_PORT: number;
  COURSES_MICROSERVICE_PORT: number;
  COURSES_MICROSERVICE_HOST: string;

  APPS_MICROSERVICE_HOST: string;
  APPS_MICROSERVICE_PORT: number;
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  USERS_MICROSERVICE_HOST: Joi.string().required(),
  USERS_MICROSERVICE_PORT: Joi.number().required(),

  PAYMENTS_MICROSERVICE_HOST: Joi.string().required(),
  PAYMENTS_MICROSERVICE_PORT: Joi.number().required(),

  COURSES_MICROSERVICE_PORT: Joi.number().required(),
  COURSES_MICROSERVICE_HOST: Joi.string().required(),

  APPS_MICROSERVICE_HOST: Joi.string().required(),
  APPS_MICROSERVICE_PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  usersMicroserviceHost: envVars.USERS_MICROSERVICE_HOST,
  usersMicroservicePort: envVars.USERS_MICROSERVICE_PORT,

  paymentsMicroserviceHost: envVars.PAYMENTS_MICROSERVICE_HOST,
  paymentsroservicePort: envVars.PAYMENTS_MICROSERVICE_PORT,

  coursesMicroservicePort: envVars.COURSES_MICROSERVICE_PORT,
  coursesMicroserviceHost: envVars.COURSES_MICROSERVICE_HOST,

  appsMicroserviceHost: envVars.APPS_MICROSERVICE_HOST,
  appsMicroservicePort: envVars.APPS_MICROSERVICE_PORT,
};
