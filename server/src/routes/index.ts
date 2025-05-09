import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import aiRout from './ai';
import photoRoutes from './photo.routes';
import { generateRes } from '../utils/api';
import authRoutes from './authRoutes';
import questionRoutes from './questionRoutes';
import scanRoutes from './scanRoutes';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for public access
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/ai', aiRout);
app.use('/photo', photoRoutes);
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/scans', scanRoutes);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.json(
    generateRes({ data: {}, message: 'Use not registered API', status: 404 }),
  );
});

export default app;
