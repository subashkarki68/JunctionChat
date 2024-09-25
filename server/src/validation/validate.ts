import { User } from '@prisma/client';
import { z } from 'zod';
import { userSchema } from './user.schema';

export function validateUser(data: User) {
  try {
    return userSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`
      );
      throw new Error(`Validation error: ${errorMessages.join(', ')}`);
    }
    throw new Error('An unexpected error occurred during validation.');
  }
}
