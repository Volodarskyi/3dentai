import { makeAutoObservable } from "mobx";

import { EDialogAction } from "@/types/enums/uiDialog";

class UiDialogStore {
  isShowUiDialog: boolean = false;
  isLoading: boolean = false;
  currentDialogAction: EDialogAction | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  onCloseSuccess: any = ()=>{
    console.log("Dialog closed successfully")};

  onCloseError: any = ()=>{console.log("Dialog closed error")}

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

  showSuccess = (successMessage: string, onCloseSuccessFn:any) => {
    this.isShowUiDialog = true;
    this.isLoading = false;
    this.successMessage = successMessage;
    this.onCloseSuccess = onCloseSuccessFn;
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
