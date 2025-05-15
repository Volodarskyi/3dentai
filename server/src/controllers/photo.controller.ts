import {NextFunction, Request, Response} from 'express';
import multer from 'multer';
import path from 'path';
import {DEFAULT_SERVER_IMAGE_STORE} from '../constants/config';
import {getFilesInFolderS3, getListFoldersS3, uploadPhotoToS3} from "../services/s3.service";
import {AppError} from "@/utils/errorUtils";
import {sendResSuccess} from "@/utils/responseUtils";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage});

const uploadPhoto = async (req: Request, res: Response) => {
    console.log('uploadPhoto controller')
    upload.single('photo')(req, res, err => {
        if (err) {
            throw new AppError('Error uploading file', 400);
        }

        if (!req.file) {
            throw new AppError('No file provided', 400);
        }

        const publicUrl = `${process.env.SERVER_IMAGE_STORE ?? DEFAULT_SERVER_IMAGE_STORE}/${req.file.filename}`;

        sendResSuccess(res, 'Photo uploaded', {url: publicUrl});
    });
};

const uploadPhotoS3 = (req: Request, res: Response, next: NextFunction,) => {
    const memoryUpload = multer().single('file'); // 📌 используем memory storage

    memoryUpload(req, res, async err => {
        if (err) {
            throw new AppError('Multer error', 500);
        }

        const file = req.file;
        const folder = req.body.folder;

        if (!file) {
            throw new AppError('File is required', 400);
        }

        try {
            const key = await uploadPhotoToS3(
                file.buffer,
                folder,
                file.originalname,
                file.mimetype
            );

            sendResSuccess(res, 'Photo has been uploaded to S3', {key});
        } catch (e: any) {
            console.error("S3 upload error:", e);
            next(e); // Forward error to the global error handler
        }
    });
};

const listFoldersS3 = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const folders = await getListFoldersS3();
        sendResSuccess(res, 'Downloaded list of folders S3', {folders});
    } catch (e: any) {
        console.error("S3 folders list error:", e);
        next(e); // Forward error to the global error handler
    }
};

const listFilesInFolderS3 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const folder = req.query.folder as string;

        const files = await getFilesInFolderS3(folder);
        sendResSuccess(res, 'Downloaded list of files in folders S3', {folder, files});
    } catch (e: any) {
        console.error("List S3 files error:", e);
        next(e); // Forward error to the global error handler
    }
};

export default {
    uploadPhoto,
    uploadPhotoS3,
    listFoldersS3,
    listFilesInFolderS3
};
