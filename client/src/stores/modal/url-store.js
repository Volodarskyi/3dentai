import {makeAutoObservable} from 'mobx';

export class UrlStore {
    isShow = false;
    url = '';
    onConfirmUrl = undefined;
    constructor() {
        makeAutoObservable(this)
    }

    setUrl = (url)=>{
        this.url =url
    }

    showAddUrl = ({onConfirmUrl}) => {
        this.onConfirmUrl = onConfirmUrl
        this.isShow = true
    }

    cleanAll=()=>{
        this.url = '';
        this.onConfirmUrl = undefined;
    }

    closeAddUrl = () => {
        this.isShow = false
        this.cleanAll()
    }

    confirmUrlAction = () => {
        if(this.onConfirmUrl && this.url.length >0){
           this.onConfirmUrl(this.url)
        }

        this.closeAddUrl()
    }
}
