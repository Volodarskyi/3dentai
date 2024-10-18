import { makeAutoObservable } from 'mobx';
import {jwtDecode} from "../../utils/parserFunctions";
import {configClient} from "../../configClient/configClient";

export class AuthStore {
    isAuth = false;
    firstName = ''
    secondName =''
    role = ''

    constructor() {
        makeAutoObservable(this);
    }

    setAuth = (isAuth)=>{
        this.isAuth = isAuth;
    }

    setFirstName = (firstName)=>{
        this.firstName = firstName
    }

    setSecondName = (secondName)=>{
        this.secondName = secondName
    }

    setRole = (role)=>{
        this.role = role
    }

    authorization = ()=>{
        const localToken = localStorage.getItem(configClient.TOKEN_ITEM_NAME);

        if (localToken) {
            const tokenData = jwtDecode(localToken)

            this.setFirstName(tokenData.payload.first)
            this.setSecondName(tokenData.payload.second)
            this.setRole(tokenData.payload.role)
            this.setAuth(true)
        }
    }

    logout = ()=>{
        console.log('auth-logout')
        this.setFirstName('')
        this.setSecondName('')
        this.setRole('')
        this.setAuth(false)
        localStorage.removeItem(configClient.TOKEN_ITEM_NAME)
    }
}
