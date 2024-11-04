import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import createError from 'http-errors';
import { envService } from './common/config';

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
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({ message: 'error', error: err.status });
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
