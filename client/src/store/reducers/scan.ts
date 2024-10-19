import { makeAutoObservable } from "mobx";
import { ISteps } from "@/types/steps";

class ScanStore {
  steps: ISteps[] = [];
  step = 1;
  disabledPrevious = true;
  disabledNext = false;

  constructor() {
    makeAutoObservable(this);
  }

  nextStep = () => {
    this.step = this.step + 1;
    this.validationButton();
  };
  previousStep = () => {
    this.step = this.step - 1;
    this.validationButton();
  };

  validationButton = () => {
    this.disabledPrevious = this.step <= 1;
    this.disabledNext = this.steps.length
      ? this.step >= this.steps.length
      : true;
  };

  setSteps = (newSteps: ISteps[]) => {
    this.steps = newSteps;
    this.validationButton();
  };
}

export default ScanStore;
