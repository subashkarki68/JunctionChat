import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} from '@/controllers/user';
import { ServerResponse, Status } from '@/types/Responses';
import { validateUser } from '@/validation/validate';
import { User } from '@prisma/client';
import Elysia from 'elysia';

const userRoutes = new Elysia({ prefix: '/users' });

userRoutes.get('/', getAllUsers);
userRoutes.get('id/:id', async ({ params: { id } }) => {
  const user = await getUserById(Number(id));
  return {
    status: Status.SUCCESS,
    message: 'User fetched successfully',
    details: user,
  } as ServerResponse;
});
userRoutes.get('un/:username', async ({ params: { username } }) => {
  const user = await getUserByUsername(username);
  return {
    status: Status.SUCCESS,
    message: 'User fetched successfully',
    details: user,
  } as ServerResponse;
});
userRoutes.post('/register', async ({ body }) => {
  const userData = await validateUser(body as User);
  await createUser(userData as User);
  return {
    status: Status.SUCCESS,
    message: 'User created successfully',
  } as ServerResponse;
});

userRoutes.post('/login', async ({ body }) => {
  return {
    status: Status.SUCCESS,
    message: 'User logged in successfully',
  } as ServerResponse;
});

export default userRoutes;
