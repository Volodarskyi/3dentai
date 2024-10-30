import { makeAutoObservable, reaction } from "mobx";

import fetch from "@/api";
import { ISteps } from "@/types/steps";

class ScanStore {
  steps: ISteps[] = [];
  step = 0;
  disabledPrevious = true;
  disabledNext = false;

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
    this.step = 1;
    this.validationButton();
  };

  nextStep = () => {
    this.step = this.step + 1;
  };

  previousStep = () => {
    this.step = this.step - 1;
  };

  validationButton = () => {
    this.disabledPrevious = this.step <= 1;
    this.disabledNext = this.steps.length
      ? this.step >= this.steps.length
      : true;
  };

  setImg = (value: string) => {
    this.imgUrl = value;
  };

  analyzeImage = async () => {
    if (this.imgUrl === "" || this.isLoading) return;
    this.isLoading = true;
    this.imgDescription = await fetch.ai.analyzeImage(this.imgUrl);
    this.isLoading = false;
  };
}

export default ScanStore;
