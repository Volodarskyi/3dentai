import express, {Request, Response} from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import aiRout from './ai.routes';
import photoRoutes from './photo.routes';
import {generateRes} from '../utils/apiUtils';
import authRoutes from './auth.routes';
import questionRoutes from './questions.routes';
import scanRoutes from './scan.routes';
import systemRoutes from "@/routes/system.routes";
import authMiddleware from "@/middlewares/auth.middleware";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for public access
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/auth', authRoutes);
app.use('/ai',  aiRout);
app.use('/photo', photoRoutes);
app.use('/questions', questionRoutes);
app.use('/scans', scanRoutes);
app.use('/system', systemRoutes);

app.use((req: Request, res: Response) => {
    res.status(404);
    res.json(
        generateRes({data: {}, message: 'Use not registered API', status: 404}),
    );
});

export default app;
