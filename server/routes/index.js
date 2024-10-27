import express from 'express';
import AIRout from './AI.js';
import PhotoRout from "./photo-route.js";
import AuthRoute from "./auth-route.js";

const app = express();

app.use('/AI', AIRout);
app.use('/photo', PhotoRout);
app.use('/auth', AuthRoute);

export default app;
