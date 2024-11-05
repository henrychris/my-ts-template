import * as dotenv from 'dotenv';
import path from 'path';
import { cleanEnv, num, port, str } from 'envalid';

interface DatabaseConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

interface EnvironmentConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE: DatabaseConfig;
}

function loadEnv(): EnvironmentConfig {
  const envPath = path.resolve(__dirname, '..', '..', '.env');
  dotenv.config({ path: envPath });

  const env = cleanEnv(process.env, {
    PORT: port({ default: 3000 }),
    NODE_ENV: str({
      choices: ['development', 'test', 'production'],
      default: 'development',
    }),
    DB_HOST: str({ desc: 'Database host' }),
    DB_PORT: num({ default: 5432, desc: 'Database port' }),
    DB_USER: str({ desc: 'Database username' }),
    DB_PASSWORD: str({ desc: 'Database password' }),
    DB_NAME: str({ desc: 'Database name' }),
  });

  return {
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
    DATABASE: {
      DB_HOST: env.DB_HOST,
      DB_PORT: env.DB_PORT,
      DB_USER: env.DB_USER,
      DB_PASSWORD: env.DB_PASSWORD,
      DB_NAME: env.DB_NAME,
    },
  };
}

export const envService = {
  env: loadEnv(),
};
