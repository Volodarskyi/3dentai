import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    PORT: process.env.SERVER_PORT || '3001',
    MONGO_URI: process.env.MONGO_URI!,
    AWS: {
        REGION: process.env.AWS_REGION_NAME!,
        BUCKET: process.env.AWS_S3_BUCKET_NAME!,
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    JWT_SECRET: process.env.JWT_SECRET!,
};

export const DEFAULT_SERVER_IMAGE_STORE = 'https://nginx-files.paxel.ca/files';
