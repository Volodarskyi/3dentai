import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { apiClient } from "@/api/apiClient";
import UiButton from "@/components/UI/UiButton/UiButton";
import { UiInputModal } from "@/components/UI/UiModal/UiInputModal/UiInputModal";
import { useStores } from "@/hooks/useStores";
import { EAuth } from "@/types/auth";

import "../UiModal.Styles.scss";

// interface ISignInWindowProps {}

const SignInWindowComponent: FC = () => {
  const { userStore, modalStore } = useStores();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    setValue(event.target.value);
  };

  const signIn = async () => {
    console.log("signIn");
    const requestUrl = "api/auth/login";

    // router.push("/scan");
    modalStore.closeUiModal();

    try {
      const res = await apiClient.post(requestUrl, { email, password });
      console.log("api signIn res:", res);

      if (res.result !== "SUCCESS") {
          throw new Error(res.message || "Some thing went wrong");
      }

      console.log("SingIn RES:", res.data);

      localStorage.setItem(EAuth.TOKEN_ITEM_NAME, res.data.token);
      userStore.authorization();
    } catch (e) {
      console.log("ERROR! Login", e);
    }
  };

  return (
    <div className="ui-modal__window">
      <UiInputModal
        icon={"email"}
        key={"email"}
        value={email}
        onChange={(event) => setInputValue(event, email, setEmail)}
        placeholder={"Email"}
      />

      <UiInputModal
        icon={"key"}
        key={"key"}
        value={password}
        onChange={(event) => setInputValue(event, password, setPassword)}
        placeholder={"Password"}
        className="mt-075"
      />

      <UiButton
        className="mt-15"
        text={"Confirm"}
        onClick={signIn}
        width={200}
        height={40}
      />
    </div>
  );
};
export const SignInWindow = observer(SignInWindowComponent);
