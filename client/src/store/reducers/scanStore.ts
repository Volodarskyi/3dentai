import { makeAutoObservable, reaction } from "mobx";

import fetch from "@/api";
import DataFetcher from "@/api/dataFetcher";
import { ISteps } from "@/types/steps";

class ScanStore {
  steps: ISteps[] = [];
  step = 0;
  disabledPrevious = true;
  disabledNext = false;

  imgFile: File | undefined = undefined;
  isLoading = false;
  imgUrl = "";
  imgDescription = "";

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.step,
      () => this.validationButton(),
    );
  }

  setSteps = (newSteps: ISteps[]) => {
    this.steps = newSteps;
    this.step = 0;
    this.validationButton();
  };

  nextStep = () => {
    this.step = this.step + 1;
  };

  previousStep = () => {
    this.step = this.step - 1;
  };

  validationButton = () => {
    this.disabledPrevious = this.step <= 0;
    this.disabledNext = this.steps.length
      ? this.step >= this.steps.length - 1
      : true;
  };

  setImgFile = (file: File): void => {
    this.imgFile = file;
  };

  setImgUrl = (value: string) => {
    this.imgUrl = value;
  };

  handleUpload = async (): Promise<void> => {
    if (!this.imgFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", this.imgFile);

    try {
      this.isLoading = true;
      const url = await DataFetcher.postFile("api/photo/upload", formData);
      console.log("url", url);

      // TODO - hot fix. Some time we have answer link, but this image doesn't save
      setTimeout(
        (context) => {
          context.setImgUrl(url);
          context.isLoading = false;
        },
        2000,
        this,
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  analyzeImage = async () => {
    if (this.imgUrl === "" || this.isLoading) return;
    this.isLoading = true;
    this.imgDescription = await fetch.ai.analyzeImage(this.imgUrl);
    this.isLoading = false;
  };
}

export default new ScanStore();
