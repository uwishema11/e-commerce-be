/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter.js';

const app = express();

app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/v1/user', userRouter);

export default app;
