import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import aiRout from './ai';
import photoRout from './photo';
import { generateRes } from '../utils/api';

const app = express();

app.use('/ai', aiRout);
app.use('/photo', photoRout);

// Default
// app.use((req: Request, res: Response) => {
//   res.status(404);
//   res.json(
//     generateRes({ data: {}, message: 'Use not registered API', status: 404 }),
//   );
// });

export default app;
