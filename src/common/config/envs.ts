import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  URI_MONGODB: string;
}

const envSchema = joi
  .object({
    URI_MONGODB: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value as EnvVars;

export const envs = {
  uriMongoDB: envVars.URI_MONGODB,
};
