import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";

import { apiClient } from "@/api/apiClient";
import UiButton from "@/components/UI/UiButton/UiButton";
import { UiInputModal } from "@/components/UI/UiModal/UiInputModal/UiInputModal";

import "../UiModal.Styles.scss";

// interface ISignUpWindowProps {}

const SignUpWindowComponent: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    setValue(event.target.value);
  };

  const singUp = async () => {
    const requestUrl = "/api/auth/signup";

    if (password !== passwordConfirm) {
      console.log("check pass dialog TODO");
      return;
    }

    try {
      const res = await apiClient.post(requestUrl, {
        email,
        password,
        firstName,
        lastName,
        birthDate,
      });
      console.log("api sign-up resObj:", res);
    } catch (e) {
      console.log("ERROR! singUp", e);
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

      <UiInputModal
        icon={"key"}
        key={"passwordConfirm"}
        value={passwordConfirm}
        onChange={(event) => setInputValue(event, password, setPasswordConfirm)}
        placeholder={"Password Confirm"}
        className="mt-075"
      />

      <UiInputModal
        icon={"name-tag"}
        key={"firstName"}
        placeholder={"First Name"}
        value={firstName}
        onChange={(event) => setInputValue(event, firstName, setFirstName)}
        className="mt-075"
      />

      <UiInputModal
        icon={"name-tag"}
        key={"secondName"}
        placeholder={"Second Name"}
        value={lastName}
        onChange={(event) => setInputValue(event, lastName, setLastName)}
        className="mt-075"
      />

      <UiInputModal
        icon={"calendar"}
        key={"birthYear"}
        placeholder="Birth Date YYYY-MM-DD"
        value={birthDate}
        onChange={(event) => setInputValue(event, birthDate, setBirthDate)}
        className="mt-075"
      />

      <UiButton
        className="mt-15"
        text={"Confirm"}
        onClick={singUp}
        width={200}
        height={40}
      />
    </div>
  );
};
export const SignUpWindow = observer(SignUpWindowComponent);
