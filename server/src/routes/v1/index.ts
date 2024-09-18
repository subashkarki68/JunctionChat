import Elysia from 'elysia';
import userRoutes from './user';

const v1Routes = new Elysia({ prefix: '/v1' });
v1Routes.use(userRoutes);
export default v1Routes;
