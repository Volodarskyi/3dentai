import { FC } from "react";
import { observer } from "mobx-react-lite";

import { UiButton } from "@/components/UI/UiButton/UiButton";
import { useStores } from "@/hooks/useStores";
import { EModalWindows } from "@/types/modal";

import "./Footer.Styles.scss";

const FooterComponent: FC = () => {
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
    <footer className="footer">
      <div className="footer__container">
        <UiButton text={"Sign In"} onClick={singIn} className="ml-025 mr-025" />

        <UiButton text={"Sign Up"} onClick={signUp} className="ml-025 mr-025" />
      </div>
    </footer>
  );
};

export const Footer = observer(FooterComponent);
