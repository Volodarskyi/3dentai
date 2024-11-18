import {makeAutoObservable} from "mobx";

class ModalStore {
    isShowUiModal: boolean = false;
    titleModal: string | undefined = undefined
    windowModal: any = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    openUiModal = (titleModal:string,windowModal: any) => {
        this.titleModal = titleModal
        this.windowModal = windowModal
        this.isShowUiModal = true
    };

    clearAll = ()=>{
        this.titleModal = undefined
        this.windowModal = undefined
    }

    closeUiModal = () => {
        this.clearAll()
        this.isShowUiModal = false
    };

}

export default new ModalStore();
