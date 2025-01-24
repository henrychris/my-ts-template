import * as dotenv from 'dotenv';
import path from 'path';
import { cleanEnv, num, port, str } from 'envalid';

interface DatabaseConfig {
  DATABASE_URL: string;
}

interface CorsConfig {
  ORIGIN: string;
}

interface EnvironmentConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE: DatabaseConfig;
  CORS: CorsConfig;
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
    DATABASE_URL: str(),

    CORS_ORIGIN: str({ default: 'http://localhost:3000' }),
  });

  return {
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
    DATABASE: {
      DATABASE_URL: env.DATABASE_URL,
    },
    CORS: {
      ORIGIN: env.CORS_ORIGIN,
    },
  };
}

export const envService = {
  env: loadEnv(),
};
