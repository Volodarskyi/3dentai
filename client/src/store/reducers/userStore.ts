import { makeAutoObservable } from "mobx";

import { EAuth } from "@/types/auth";
import { jwtDecode } from "@/utils/authUtils";

class UserStore {
  isAuth = false;
  firstName = "";
  secondName = "";
  role = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  setFirstName = (firstName: string) => {
    this.firstName = firstName;
  };

  setSecondName = (secondName: string) => {
    this.secondName = secondName;
  };

  setRole = (role: string) => {
    this.role = role;
  };

  authorization = () => {
    const localToken = localStorage.getItem(EAuth.TOKEN_ITEM_NAME);

    if (localToken) {
      const tokenData = jwtDecode(localToken);

      this.setFirstName(tokenData.payload.first);
      this.setSecondName(tokenData.payload.second);
      this.setRole(tokenData.payload.role);
      this.setAuth(true);
    }
  };

  logout = () => {
    console.log("auth-logout");
    this.setFirstName("");
    this.setSecondName("");
    this.setRole("");
    this.setAuth(false);
    localStorage.removeItem(EAuth.TOKEN_ITEM_NAME);
  };
}

export default new UserStore();
