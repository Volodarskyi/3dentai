import { makeAutoObservable } from "mobx";

import { EModalWindows } from "@/types/modal";

class MenuStore {
    isShow: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    openMenu = () => {
        console.log("openMenu");
        this.isShow = true;
    };

    closeMenu = () => {
        console.log("closeMenu");
        this.isShow = false;
    };
}

export default new MenuStore();
