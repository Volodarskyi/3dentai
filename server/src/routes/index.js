import express from 'express';
import aiRout from './ai.js';
import PhotoRout from './photo.js';

const app = express();

app.use('/ai', aiRout);
app.use('/photo', PhotoRout);

export default app;
