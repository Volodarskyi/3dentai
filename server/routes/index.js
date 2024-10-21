import express from 'express';
import AIRout from './AI.js';
import PhotoRoute from "./photo-route.js";

const app = express();

app.use('/AI', AIRout);
app.use('/photo', PhotoRoute);

export default app;
