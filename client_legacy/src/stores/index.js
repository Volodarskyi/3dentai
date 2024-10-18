import {createContext, useContext} from 'react';
import {AuthStore} from "./auth/auth-store";
import {DialogStore} from "./dialog/dialog-store";
import {ModalStore} from "./modal/modal-store";
import {UrlStore} from "./modal/url-store";
import {UiStore} from "./ui/ui-store";
import {UserStore} from "./user/user-store";

let store;

const StoreContext = createContext(undefined);

export class RootStore {
    authStore = undefined
    dialogStore = undefined
    modalStore=undefined
    uiStore =undefined
    userStore = undefined
    urlStore = undefined

    constructor() {
        this.authStore = new AuthStore()
        this.dialogStore = new DialogStore()
        this.modalStore = new ModalStore()
        this.uiStore = new UiStore()
        this.userStore = new UserStore()
        this.urlStore = new UrlStore()
    }
}

function RootStoreProvider({children}) {
    const root = store ?? new RootStore();
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}


function useRootStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
}

export {RootStoreProvider, StoreContext, useRootStore};
