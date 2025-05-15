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
import messageRoutes from "@/routes/message.routes";
import {AppError} from "@/utils/errorUtils";
import conversationRoutes from "@/routes/conversation.routes";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for public access
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/auth', authRoutes);
app.use('/system', systemRoutes);
app.use('/questions', questionRoutes);
app.use('/ai', authMiddleware, aiRout);
app.use('/photo', authMiddleware, photoRoutes);
app.use('/scans', authMiddleware, scanRoutes);
app.use('/messages', authMiddleware, messageRoutes);
app.use('/conversations', authMiddleware, conversationRoutes);

app.use((req: Request, res: Response) => {
    throw new AppError("Route not found", 404);
});

export default app;
