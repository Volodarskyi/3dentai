import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { sendErrorLog } from '../utils/apiUtils';

// Определяем __dirname в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Путь к package.json (двумя уровнями выше)
const packageJsonPath = resolve(__dirname, '../../package.json');

const getServerVersion = async (req: Request, res: Response): Promise<void> => {
    try {
        const fileContent = readFileSync(packageJsonPath, 'utf8');
        const pkg = JSON.parse(fileContent);
        const serverVersion = pkg.version || 'unknown';
        console.log('getServerVersion:',{serverVersion, aiVersion:'mistral'} )

        res.status(200).json({
            result: 'SUCCESS',
            data: { serverVersion,aiVersion:'mistral' },
            message: 'Server version fetched',
            details: `Current version: ${serverVersion}`,
        });
    } catch (e) {
        console.error('ERROR (System.route-getVersion):', e);
        sendErrorLog({
            res,
            url: 'GET api/system/version',
            error: (e as Error).message,
        });
        res.status(500).json({
            result: 'ERROR',
            data: null,
            message: 'Server ERROR!',
            details: 'In route: get system version',
        });
    }
};

export default {
    getServerVersion,
};
