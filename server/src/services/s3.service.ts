import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import {appConfig} from "../constants/config";

const REGION = appConfig.AWS.REGION!;
const BUCKET = appConfig.AWS.BUCKET!;

console.log('AWS_REGION',appConfig.AWS.REGION)
console.log('AWS_S3_BUCKET_NAME',appConfig.AWS.BUCKET)
console.log('AWS_ACCESS_KEY_ID',appConfig.AWS.ACCESS_KEY_ID)
console.log('AWS_SECRET_ACCESS_KEY',appConfig.AWS.SECRET_ACCESS_KEY)

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: appConfig.AWS.ACCESS_KEY_ID!,
        secretAccessKey: appConfig.AWS.SECRET_ACCESS_KEY!,
    },
});

// Upload photo to S3
export const uploadPhotoToS3 = async (
    buffer: Buffer,
    folder: string,
    originalName: string,
    mimeType: string
): Promise<string> => {
    const filename = `${folder}/${originalName}`;

    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: filename,
            Body: buffer,
            ContentType: mimeType,
        });

        await s3.send(command);
        return filename;
    } catch (error: any) {
        console.error("Error uploading to S3:", error);
        throw new Error(error.message || "S3 upload failed");
    }
};

// List "folders" in S3
export const getListFoldersS3 = async (): Promise<string[]> => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET,
            Delimiter: '/',
        });

        const response = await s3.send(command);
        return response.CommonPrefixes?.map(prefix => prefix.Prefix!) || [];
    } catch (error: any) {
        console.error("Error listing folders from S3:", error);
        throw new Error(error.message || "S3 folder list failed");
    }
};

// List files in a specific folder
export const getFilesInFolderS3 = async (folder: string): Promise<string[]> => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: appConfig.AWS.BUCKET,
            Prefix: folder.endsWith('/') ? folder : `${folder}/`,
        });

        const response = await s3.send(command);

        const files = response.Contents?.map(obj => obj.Key!).filter(
            key => key !== `${folder}/` // exclude folder marker itself
        ) || [];

        return files;
    } catch (error: any) {
        console.error("Error listing files in S3 folder:", error);
        throw new Error(error.message || "S3 file list failed");
    }
};


