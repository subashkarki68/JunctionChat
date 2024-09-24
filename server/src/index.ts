import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { AuthenticationError } from './exceptions/AuthenticationError';
import { AuthorizationError } from './exceptions/AuthorizationError';
import { InvariantError } from './exceptions/InvariantError';
import routes from './routes';
const app = new Elysia();

app
  .error('AUTHENTICATION_ERROR', AuthenticationError)
  .error('AUTHORIZATION_ERROR', AuthorizationError)
  .error('INVARIANT_ERROR', InvariantError)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'AUTHENTICATION_ERROR':
        set.status = 401;
        return {
          status: 'error',
          message: error.toString().replace('Error: ', ''),
        };
      case 'AUTHORIZATION_ERROR':
        set.status = 403;
        return {
          status: 'error',
          message: error.toString().replace('Error: ', ''),
        };
      case 'INVARIANT_ERROR':
        set.status = 400;
        return {
          status: 'error',
          message: error.toString().replace('Error: ', ''),
        };
      case 'NOT_FOUND':
        set.status = 404;
        return {
          status: 'error',
          message: error.toString().replace('Error: ', ''),
        };
      case 'INTERNAL_SERVER_ERROR':
        set.status = 500;
        return {
          status: 'error',
          message: 'Something went wrong!',
        };
    }
  })
  .use(routes);
app.use(swagger()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
