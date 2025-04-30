import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { DEFAULT_SERVER_IMAGE_STORE } from '../constants/config';
import {getFilesInFolderS3, getListFoldersS3, uploadPhotoToS3} from "../services/s3.service";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const uploadPhoto = async (req: Request, res: Response) => {
  console.log('uploadPhoto controller')
  upload.single('photo')(req, res, err => {
    if (err) {
      return res
        .status(500)
        .send({ message: 'Error uploading file', error: err });
    }

    if (!req.file) {
      return res.status(400).send({ message: 'No file provided' });
    }

    const publicUrl = `${process.env.SERVER_IMAGE_STORE ?? DEFAULT_SERVER_IMAGE_STORE}/${req.file.filename}`;
    return res.status(200).send({ url: publicUrl });
  });
};

const uploadPhotoS3 = (req: Request, res: Response) => {
  const memoryUpload = multer().single('file'); // 📌 используем memory storage

  memoryUpload(req, res, async err => {
    if (err) {
      return res.status(500).json({ error: "Multer error", details: err.message });
    }

    const file = req.file;
    const folder = req.body.folder;

    if (!file) return res.status(400).json({ error: "File is required" });

    try {
      const key = await uploadPhotoToS3(
          file.buffer,
          folder,
          file.originalname,
          file.mimetype
      );

      res.json({ key });
    } catch (err: any) {
      console.error("S3 upload error:", err);
      res.status(500).json({ error: "Upload failed", details: err.message });
    }
  });
};

const listFoldersS3 = async (_req: Request, res: Response) => {
  try {
    const folders = await getListFoldersS3();
    res.json({ folders });
  } catch (err: any) {
    console.error("S3 list error:", err);
    res.status(500).json({ error: "Failed to list folders", details: err.message });
  }
};

const listFilesInFolderS3 = async (req: Request, res: Response):Promise<void> => {
  try {
    const folder = req.query.folder as string;

    // if (!folder) {
    //   return res.status(400).json({ error: "Query param `folder` is required" });
    // }

    const files = await getFilesInFolderS3(folder);
    res.json({ folder, files });
  } catch (error: any) {
    console.error("List S3 files error:", error);
    res.status(500).json({ error: "Failed to list files", details: error.message });
  }
};

export default {
  uploadPhoto,
  uploadPhotoS3,
  listFoldersS3,
  listFilesInFolderS3
};
