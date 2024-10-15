import {makeAutoObservable} from 'mobx';

export class ModalStore {
    isShow = false;
    title = undefined;
    head = undefined;
    body = undefined;
    onConfirmCb = undefined;
    withPass = false;
    password='';

    constructor() {
        makeAutoObservable(this)
    }

    setTitle = (title) => {
        this.title = title
    }

    setHead = (head) => {
        this.head = head
    }

    setBody = (body) => {
        this.body = body
    }

    setOnConfirmCb = (onConfirmCb) => {
        this.onConfirmCb = onConfirmCb
    }

    setWithPass = (isPass) => {
        this.withPass = isPass
    }

    setPassword = (password)=>{
        this.password =password
    }

    clearAll = () => {
        this.setTitle(undefined)
        this.setHead(undefined)
        this.setBody(undefined)
        this.setOnConfirmCb(undefined)
        this.setWithPass(false)
        console.log('Modal store-clear all')
    }

    showModal = ({title, head, body, onConfirmCb, isPass = false}) => {
        this.setPassword('')
        this.setTitle(title)
        this.setHead(head)
        this.setBody(body)
        this.setOnConfirmCb(onConfirmCb)
        this.setWithPass(isPass)
        this.isShow = true;
    }

    closeModal = () => {
        this.isShow = false;
        this.clearAll();
    }

    confirmModalAction = () => {
        this.onConfirmCb()
        this.closeModal()
    }
}
