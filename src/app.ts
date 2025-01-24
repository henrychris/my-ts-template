import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from './common/serviceResponse';
import rootRouter from './common/routes/index';
import { envService } from './common/config';
import cors from 'cors';

export const app = express();

const corsOrigins = envService.env.CORS.ORIGIN.split(',');
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello there!');
  return;
});

// add routes here
app.use('/api/', rootRouter);

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

export default app;
