import { makeAutoObservable, reaction } from "mobx";

import { apiClient } from "@/api/apiClient";
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

  testApiGet = async () => {
    try {
      const res = await apiClient.get("/api/ai/test");
      console.log("api client-test:", res.data);
    } catch (e) {
      console.error("TEST API ERROR", e);
    }
  };

  testApiPost = async () => {
    try {
      const res = await apiClient.post("/api/ai/test",{someObj:'ping-ai'});
      console.log("api client-test-post:", res.data);
    } catch (e) {
      console.error("TEST API ERROR", e);
    }
  };

}

export default ScanStore;
