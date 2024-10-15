import {makeAutoObservable} from 'mobx';

export class UiStore {
    mainPageTab = 'step1';
    ownerPageTab = 'users';
    menuIsShow = false;
    passwordHide = true;
    flipCardOpen = true;

    constructor() {
        makeAutoObservable(this)
    }

    setMainPageTab = (selectedTab) => {
        this.mainPageTab = selectedTab
    }

    setOwnerPageTab = (selectedTab) => {
        this.ownerPageTab = selectedTab
    }

    openMenu = () => {
        this.menuIsShow = true
    }

    closeMenu = () => {
        this.menuIsShow = false
    }

    passwordHideToggle = ()=>{
        console.log('TOGLEE PASS')
        this.passwordHide = !this.passwordHide
    }

    flipCardToggle = ()=>{
        this.flipCardOpen = !this.flipCardOpen
    }

    flipCardFront=()=>{
        if(this.flipCardOpen){
            return;
        }

        this.flipCardOpen = true
    }
}
