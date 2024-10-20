import {makeAutoObservable} from 'mobx';

export class DialogStore {
    isShow = false;
    isLoading = false;
    methodResult = undefined;
    error = undefined;
    closeCb = () => {
        console.log('close cb')
    };

    constructor() {
        makeAutoObservable(this)
    }

    clearAll = () => {
        this.isLoading = false;
        this.methodResult = undefined;
        this.error = undefined;
        this.closeCb = () => {
            console.log('close cb')
        };
    }

    showWindow = () => {
        this.isShow = true;
    }

    closeWindow = () => {
        this.isShow = false;
    }

    loadingStart = () => {
        this.isLoading = true;
    }

    loadingFinish = () => {
        this.isLoading = false
    }

    showLoader = () => {
        this.clearAll()
        this.showWindow()
        this.loadingStart()
    }

    closeLoader = () => {
        this.loadingFinish()
        this.closeWindow()
        this.clearAll()
    }

    setResult = (result, closeCb = null) => {
        this.clearAll()
        this.methodResult = result
        console.log('setResult-store,', result)
        if (closeCb) {
            this.closeCb = closeCb
        }
    }

    closeResult = () => {
        this.closeCb()
        this.isShow = false;

        this.clearAll()
    }

    showError = (error) => {
        this.showWindow()
        this.error = error
    }

    closeError = () => {
        this.closeWindow()
        this.clearAll()
    }
}
