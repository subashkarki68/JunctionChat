import { z } from 'zod';
import { envSchema } from './env.schema';

export function validateEnvVariables() {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid environment variables:', error.issues);
      process.exit(1);
    }
    throw error;
  }
}
