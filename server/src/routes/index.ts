import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import aiRout from './ai';
import photoRout from './photo';
import { generateRes } from '../utils/api';
import authRoutes from "./authRoutes";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for public access
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/ai', aiRout);
app.use('/photo', photoRout);
app.use('/auth', authRoutes);

// Default
app.use((req: Request, res: Response) => {
  res.status(404);
  res.json(
    generateRes({ data: {}, message: 'Use not registered API', status: 404 }),
  );
});

export default app;
