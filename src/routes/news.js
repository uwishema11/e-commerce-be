import express from 'express';
import sendNewsLetter from '../controllers/newsletterController';

const newsRouter = express.Router();
newsRouter.post('/', sendNewsLetter);

export default newsRouter;
