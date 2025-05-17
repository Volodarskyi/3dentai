import { makeAutoObservable } from "mobx";

import { EDialogAction } from "@/types/enums/uiDialog";

class UiDialogStore {
  isShowUiDialog: boolean = false;
  isLoading: boolean = false;
  currentDialogAction: EDialogAction | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  startLoading = () => {
    this.isLoading = true;
    this.currentDialogAction = EDialogAction.SHOW_LOADER;
  };

  showLoader = () => {
    console.log('showLoader');
    this.isShowUiDialog = true;
    this.startLoading();
  };

  showSuccess = (successMessage: string) => {
    this.isShowUiDialog = true;
    this.isLoading = false;
    this.successMessage = successMessage;
    this.currentDialogAction = EDialogAction.SHOW_SUCCESS_RESULT;
  };

  showError = (errorMessage: string) => {
    this.isShowUiDialog = true;
    this.isLoading = false;
    this.errorMessage = errorMessage;
    this.currentDialogAction = EDialogAction.SHOW_ERROR_RESULT;
  };

  closeAll = () => {
    this.isShowUiDialog = false;
    this.isLoading = false;
    this.successMessage = null;
    this.errorMessage = null;
    this.currentDialogAction = null;
  };
}

export default new UiDialogStore();
