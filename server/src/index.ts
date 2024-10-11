import jwt from '@elysiajs/jwt';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { validateEnvVariables } from './config/env/env.validate';
import { AuthenticationError } from './exceptions/AuthenticationError';
import { AuthorizationError } from './exceptions/AuthorizationError';
import { InvariantError } from './exceptions/InvariantError';
import routes from './routes';

const app = new Elysia();
validateEnvVariables();

// Utility function to format error messages
const formatErrorMessage = (error: Error | string) => error.toString();

app
  // Custom error handling for specific cases
  .error('AUTHENTICATION_ERROR', AuthenticationError)
  .error('AUTHORIZATION_ERROR', AuthorizationError)
  .error('INVARIANT_ERROR', InvariantError)

  // Global error handling
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'AUTHENTICATION_ERROR':
        set.status = 401;
        return { status: 'error', message: formatErrorMessage(error) };
      case 'AUTHORIZATION_ERROR':
        set.status = 403;
        return { status: 'error', message: formatErrorMessage(error) };
      case 'INVARIANT_ERROR':
        set.status = 400;
        return { status: 'error', message: formatErrorMessage(error) };
      case 'NOT_FOUND':
        set.status = 404;
        return { status: 'error', message: formatErrorMessage(error) };
      case 'INTERNAL_SERVER_ERROR':
        set.status = 500;
        return { status: 'error', message: 'Something went wrong!' };
      default:
        set.status = 500;
        return { status: 'error', message: formatErrorMessage(error) };
    }
  })
  .use(
    jwt({
      name: 'authorization',
      secret: process.env.JWT_SECRET! as string,
    })
  )
  // Register routes and Swagger documentation
  .use(routes)
  .use(swagger())

  // Start the server on port 3000
  .listen(3000);

// Safeguard unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname || 'localhost'}:${app.server?.port || 3000}`
);
