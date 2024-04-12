import express from 'express';
import sendNewsLetter from '../controllers/newsletterController.js';

const newsRouter = express.Router();
newsRouter.post('/', sendNewsLetter);

export default newsRouter;
