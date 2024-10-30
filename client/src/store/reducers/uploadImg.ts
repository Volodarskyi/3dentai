import { makeAutoObservable } from "mobx";

import DataFetcher from "@/api/dataFetcher";

export class UploadImg {
  imgFile: File | undefined = undefined;
  imgUrl: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setImgFile = (file: File): void => {
    this.imgFile = file;
  };

  setImgUrl = (imgUrl: string): void => {
    this.imgUrl = imgUrl;
  };

  handleUpload = async (): Promise<void> => {
    if (!this.imgFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", this.imgFile);

    try {
      const url = await DataFetcher.postFile("api/photo/upload", formData);

      console.log("url", url);

      this.setImgUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
}
