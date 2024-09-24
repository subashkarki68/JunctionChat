import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} from '@/controllers/user';
import { User } from '@prisma/client';
import Elysia from 'elysia';

const userRoutes = new Elysia({ prefix: '/users' });

userRoutes.get('/', async () => {
  try {
    const users = await getAllUsers();
    return {
      success: true,
      data: users,
    };
  } catch (error: any) {
    throw new Error(error.message); // Let onError middleware handle response
  }
});

userRoutes.get('id/:id', ({ params: { id } }) => {
  try {
    const user = getUserById(Number(id));
    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
});
userRoutes.get('un/:username', ({ params: { username } }) => {
  try {
    const user = getUserByUsername(username);
    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
});

userRoutes.post('/register', async ({ body }) => {
  console.log('🚀 ~ userRoutes.post ~ body:', body);
  try {
    const userData = body as User;
    await createUser(userData);
    return { success: true, message: 'User registered successfully' };
  } catch (error: any) {
    console.log('🚀 ~ userRoutes.post ~ error:', error);
    throw new Error(error.message);
  }
});

export default userRoutes;
