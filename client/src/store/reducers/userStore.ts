import { makeAutoObservable } from "mobx";

import { EAuth } from "@/types/auth";
import { jwtDecode } from "@/utils/authUtils";

class UserStore {
  isAuth = false;
  id = "";
  firstName = "";
  secondName = "";
  role = "";

  constructor() {
    makeAutoObservable(this);
    this.authorization();
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

  setUser = (user: {
    lastName: string;
    firstName: string;
    role: string;
    userId: string;
  }) => {
    this.id = user.userId;
    this.firstName = user.firstName;
    this.secondName = user.lastName;
    this.role = user.role;
    this.isAuth = true;
  };

  authorization = () => {
    const localToken = localStorage.getItem(EAuth.TOKEN_ITEM_NAME);

    if (localToken) {
      const tokenData = jwtDecode(localToken);
      this.setUser(tokenData.payload);
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
