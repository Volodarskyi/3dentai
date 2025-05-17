import { makeAutoObservable, reaction } from "mobx";

import { apiClient } from "@/api/apiClient";
import { aiApiServices } from "@/api/services/aiApiServices";
import { ISteps } from "@/types/steps";

class ScanStore {
  steps: ISteps[] = [];
  step: number = 0;
  disabledPrevious: boolean = true;
  disabledNext: boolean = false;

  imgFile: File | undefined = undefined;
  isLoading: boolean = false;
  imgUrl: string = "";
  imgDescription: string = "";

  // SCAN_DATA
  scanData = {
    doctorId: "", // устанавливается при логине или получении сессии
    teeth: {} as Record<string, string>,
    resultAI: "",
    questions: [] as {
      type: "radio" | "checkbox";
      question: string;
      answers: { label: string; value: boolean }[];
      active: boolean;
    }[],
  };

  activeTooth: number = 48;

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
      const res = await apiClient.postFile("api/photo/upload", formData);
      console.log("RES", res);
      console.log("url", res.data.url);

      // TODO - hot fix. Some time we have answer link, but this image doesn't save
      setTimeout(
        (context) => {
          context.setImgUrl(res.data.url);
          // context.scanData.teeth[this.activeTooth] = res.data.url;
          this.addToothPhotoUrl(res.data.url)
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
    this.imgDescription = await aiApiServices.analyzeImage(this.imgUrl);
    this.isLoading = false;
  };


  // SET_SCAN_DATA
  setActiveTooth = (activeTooth:number) => {
    console.log("set-activeTooth", activeTooth);
    this.activeTooth =activeTooth;
  }

  addToothPhotoUrl = (toothPhotoUrl:string)=>{
    const tootNumber = this.activeTooth;
    console.log("addToothPhotoUrl-tootNumber", tootNumber);
    console.log("addToothPhotoUrl-toothPhotoUrl", toothPhotoUrl);
    const updateTeethObj = {[tootNumber]:toothPhotoUrl};
    console.log("addToothPhotoUrl-toothPhotoUrl", updateTeethObj);
    this.scanData.teeth = updateTeethObj;
  }

  submitScan = () => {
    const dataToSubmit = {
      doctorId: this.scanData.doctorId,
      teeth: this.scanData.teeth,
      resultAI: this.scanData.resultAI,
      questions: this.scanData.questions,
    };

    console.log("SCAN DATA TO SUBMIT:", JSON.stringify(dataToSubmit, null, 2));
  };
}

export default new ScanStore();
