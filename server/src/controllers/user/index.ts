import { User } from '@prisma/client';
import prisma from '../../db';

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error: unknown) {
    console.error('Error getting all users:', error);
    throw new Error('Failed to retrieve users');
  }
};

export const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error: unknown) {
    // throw error
    console.error('Error getting user by id: ', error);
    throw new Error('Failed to retrieve user');
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await prisma.user.findUnique({ where: { username } });
  } catch (error: unknown) {
    // throw error
    console.error('Error getting user by username: ', error);
    throw new Error('Failed to retrieve user');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error: unknown) {
    // throw error
    console.error('Error getting user by email: ', error);
    throw new Error('Failed to retrieve user');
  }
};

export const createUser = async (user: User) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email }],
      },
    });
    console.log('🚀 ~ createUser ~ existingUser:', existingUser);
    if (existingUser) {
      throw new Error('Username already taken');
    }
    return await prisma.user.create({ data: user });
  } catch (error: any) {
    console.error('Error creating user: ', error);
    throw new Error('Failed to create user');
  }
};
