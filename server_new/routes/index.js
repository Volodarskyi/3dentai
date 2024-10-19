import express from 'express';
import AIRout from './AI.js';

const app = express();

app.use('/AI', AIRout);

export default app;
