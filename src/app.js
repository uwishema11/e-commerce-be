import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import userRouter from './routes/userRouter';
import newsRouter from './routes/news';
import otpRouter from './routes/otpRouter';
import productRouter from './routes/productRoute';

const app = express();
// GLOBAL MIDDLWARE

app.use(helmet()); // Helmet helps secure Express apps by setting various HTTP headers.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/newsLetter', newsRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/product', productRouter);

export default app;
