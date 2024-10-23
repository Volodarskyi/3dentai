import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import axios from "axios";

export class UploadImgStore {
    imgFile: File | undefined = undefined;

    imgUrl: string | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setImgFile = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            this.imgFile = e.target.files[0];
        }
    };

    setImgUrl = (imgUrl: string): void => {
        this.imgUrl = imgUrl;
    }

    handleUpload = async (): Promise<void> => {
        if (!this.imgFile) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', this.imgFile);

        try {
            console.log('MY ENV:',process.env.NEXT_PUBLIC_APP_ENV)
            const response = await axios.post<{ url: string }>('api/photo/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                baseURL:
                    process.env.NEXT_PUBLIC_APP_ENV === "development"
                        ? process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT
                        : process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
            });
            console.log('Res handleUpload:',response)
            this.setImgUrl(response.data.url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
}
