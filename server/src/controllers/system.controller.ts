import { Request, Response , NextFunction} from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import {sendResSuccess} from "@/utils/responseUtils";

// Определяем __dirname в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path to package.json
const packageJsonPath = resolve(__dirname, '../../package.json');

const getServerVersion = async (req: Request, res: Response,next: NextFunction,): Promise<void> => {
    try {
        const fileContent = readFileSync(packageJsonPath, 'utf8');
        const pkg = JSON.parse(fileContent);
        const serverVersion = pkg.version || 'unknown';

        sendResSuccess(res,'Server version fetched', { serverVersion,aiVersion:'mistral' } )
    } catch (error) {
        console.error('ERROR (System.route-getVersion):', error);
        next(error); // Forward error to the global error handler
    }
};

export default {
    getServerVersion,
};
