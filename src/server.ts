import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import createError from 'http-errors';
import { envService } from './common/config';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from './common/serviceResponse';

export const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello there!');
  return;
});

// add routes here

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(StatusCodes.NOT_FOUND, 'Resource not found'));
});

app.use(function (err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  const message =
    err.status === StatusCodes.NOT_FOUND
      ? 'Resource not found'
      : 'Something went wrong. Please try again later.';

  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const serviceResponse = ServiceResponse.failure(message, null, statusCode);
  res.status(statusCode).send(serviceResponse.toResponse());
});

async function startServer(): Promise<void> {
  const PORT = envService.env.PORT;

  if (envService.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer().catch((error) => {
  console.error('Error starting the server:', error.message);
  process.exit(1);
});
