import Elysia from 'elysia';

const userRoutes = new Elysia({ prefix: '/users' });
userRoutes.get('/', () => 'Hello User');
export default userRoutes;
