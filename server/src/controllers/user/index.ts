import { User } from '@prisma/client';
import prisma from '../../db';

class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}

const logError = (message: string, error: unknown) => {
  console.error(`${message}:`, error instanceof Error ? error.message : error);
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany();
  } catch (error: unknown) {
    logError('Error getting all users', error);
    throw new UserError('Failed to retrieve users');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    if (!id || isNaN(id)) throw new UserError('Invalid user ID');
    return await prisma.user.findUnique({ where: { id } });
  } catch (error: unknown) {
    logError('Error getting user by id', error);
    throw new UserError('Failed to retrieve user');
  }
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    if (!username) throw new UserError('Username cannot be empty');
    return await prisma.user.findUnique({ where: { username } });
  } catch (error: unknown) {
    logError('Error getting user by username', error);
    throw new UserError('Failed to retrieve user');
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    if (!email) throw new UserError('Email cannot be empty');
    return await prisma.user.findUnique({ where: { email } });
  } catch (error: unknown) {
    logError('Error getting user by email', error);
    throw new UserError('Failed to retrieve user');
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    if (!user.username || !user.email) {
      throw new UserError('Username and Email are required');
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === user.username) {
        throw new UserError('Username already taken');
      } else if (existingUser.email === user.email) {
        throw new UserError('Email already exists');
      } else {
        throw new UserError('Username or Email already exist');
      }
    }

    return await prisma.user.create({ data: user });
  } catch (error: unknown) {
    logError('Error creating user', error);

    // Ensure the error message isn't concatenated twice
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create user';
    throw new UserError(errorMessage);
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    return await prisma.user.update({ where: { id: user.id }, data: user });
  } catch (error: unknown) {
    logError('Error updating user', error);
    throw new UserError('Failed to update user');
  }
};

export const updateUserProfile = async (
  user: User,
  field: keyof User,
  value: any
): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: user.id },
      data: { [field]: value },
    });
  } catch (error) {
    logError('Error updating user profile', error);
    throw new UserError('Failed to update user profile');
  }
};
