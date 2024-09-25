import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} from '@/controllers/user';
import { validateUser } from '@/validation/validate';
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

userRoutes.get('id/:id', async ({ params: { id } }) => {
  try {
    const user = await getUserById(Number(id));
    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
});
userRoutes.get('un/:username', async ({ params: { username } }) => {
  try {
    const user = await getUserByUsername(username);
    console.log('🚀 ~ userRoutes.get ~ user:', user);
    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
});

userRoutes.post('/register', async ({ body }) => {
  // console.log('🚀 ~ userRoutes.post ~ body:', body);
  try {
    // const userData = body as User;
    const userData = await validateUser(body as User);
    await createUser(userData as User);
    return { success: true, message: 'User registered successfully' };
  } catch (error: any) {
    console.log('🚀 ~ userRoutes.post ~ error:', error);
    throw new Error(error.message);
  }
});

export default userRoutes;
