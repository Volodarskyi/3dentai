import { makeAutoObservable, reaction } from "mobx";

import { ISteps } from "@/types/steps";

class ScanStore {
  steps: ISteps[] = [];
  step = 1;
  disabledPrevious = true;
  disabledNext = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.step,
      () => this.validationButton(),
    );
  }

  setSteps = (newSteps: ISteps[]) => {
    this.steps = newSteps;
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
}

export default ScanStore;
