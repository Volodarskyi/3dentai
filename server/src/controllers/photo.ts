import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { DEFAULT_SERVER_IMAGE_STORE } from '@/constants/config';

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
  console.log('uploadPhoto controller');
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

export default {
  uploadPhoto,
};
