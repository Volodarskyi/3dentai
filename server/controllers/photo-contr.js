// import { generateRes, sendErrorLog } from '../utils/api.js';
import multer from 'multer';
import path from 'path';

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save uploads to /uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Use a unique name for the file
    }
});

// Initialize Multer
const upload = multer({ storage: storage });

// Controller to handle photo upload
export const uploadPhoto = (req, res) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error uploading file', error: err });
        }

        if (!req.file) {
            return res.status(400).send({ message: 'No file provided' });
        }

        // Generate public URL for the uploaded photo
        console.log('Generate public URL for the uploaded photo')
        const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        return res.status(200).send({ url: publicUrl });
    });
};

export default {
    uploadPhoto
}
