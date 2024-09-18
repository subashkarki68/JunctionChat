import { Elysia } from 'elysia';
import v1Routes from './v1';

const routes = new Elysia({ prefix: '/api' });
routes.use(v1Routes);
export default routes;
