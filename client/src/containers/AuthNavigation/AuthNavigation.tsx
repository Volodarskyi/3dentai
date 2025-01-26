import { FC } from "react";
import { observer } from "mobx-react-lite";

import Button from "@/components/Button";
import { useStores } from "@/hooks/useStores";
import { EModalWindows } from "@/types/modal";

import styles from "./styles.module.scss";

const AuthNavigation: FC = () => {
  const { modalStore } = useStores();

  const singIn = () => {
    modalStore.openModal(EModalWindows.SignIn);
  };

  const signUp = () => {
    modalStore.openModal(EModalWindows.SignUp);
  };

  return (
    <div className={styles.container}>
      <Button onClick={singIn} text={"Sign In"} />
      <Button onClick={signUp} text={"Sign Up"} />
    </div>
  );
};

export default observer(AuthNavigation);
