import express from 'express';
import AIRout from './AI.js';
import PhotoRout from "./photo-route.js";

const app = express();

app.use('/AI', AIRout);
app.use('/photo', PhotoRout);

export default app;
