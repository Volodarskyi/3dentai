import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";
import { EModalWindows } from "@/types/modal";
import { UiButton } from "@/UI/UiButton/UiButton";

import styles from "./styles.module.scss";

const AuthNavigation: FC = () => {
  const { modalStore } = useStores();

  const singIn = () => {
    console.log("login func");
    modalStore.openModal(EModalWindows.SignIn);
  };

  const signUp = () => {
    console.log("signIn func");
    modalStore.openModal(EModalWindows.SignUp);
  };

  return (
    <div className={styles.container}>
      <UiButton onClick={singIn} text={"Sign In"} />
      <UiButton onClick={signUp} text={"Sign Up"} />
    </div>
  );
};

export default observer(AuthNavigation);
