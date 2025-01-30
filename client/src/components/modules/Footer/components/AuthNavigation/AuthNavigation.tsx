import { FC } from "react";
import { observer } from "mobx-react-lite";

import Button from "@/components/UI/UiButton/UiButton";
import { useStores } from "@/hooks/useStores";
import { EModalWindows } from "@/types/modal";

import "./authNavigation.styles.scss";

const AuthNavigation: FC = () => {
  const { modalStore } = useStores();

  const singIn = () => {
    modalStore.openModal(EModalWindows.SignIn);
  };

  const signUp = () => {
    modalStore.openModal(EModalWindows.SignUp);
  };

  return (
    <div className={"authNavigation"}>
      <Button onClick={singIn} text={"Sign In"} />
      <Button onClick={signUp} text={"Sign Up"} />
    </div>
  );
};

export default observer(AuthNavigation);
