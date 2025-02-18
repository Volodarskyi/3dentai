import { makeAutoObservable } from "mobx";

import { EModalWindows } from "@/types/modal";

class ModalStore {
  isShowUiModal: boolean = false;
  currentModal: EModalWindows | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (modalType: EModalWindows) => {
    this.currentModal = modalType;
    this.isShowUiModal = true;
  };

  closeUiModal = () => {
    console.log("closeUiModal");
    this.currentModal = null;
    this.isShowUiModal = false;
  };
}

export default new ModalStore();
