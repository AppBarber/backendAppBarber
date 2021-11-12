import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json({
  limit: '50mb'
}));

app.use(express.urlencoded({
  limit: '50mb'
}))


app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server.error',
    });
  },
);

app.get('/', (request, response) => {
  return response.send('Bem vindo a Api GoBarber :)');
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
