import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import routes from './routes';

const app = new Elysia();

app.use(routes);
app.use(swagger()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
