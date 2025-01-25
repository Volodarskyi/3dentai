/* eslint-disable */

import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";

import dataFetcher from "@/api/dataFetcher";
import UiButton  from "@/components/UI/UiButton";
import { UiInputModal } from "@/components/UI/UiModal/UiInputModal/UiInputModal";
import {useStores} from "@/hooks/useStores";

import "../UiModal.Styles.scss";
import {UiInputModal} from "@/components/UI/UiModal/UiInputModal/UiInputModal";
import {UiButton} from "@/components/UI/UiButton/UiButton";

// interface ISignUpWindowProps {}
interface ISignUpWindowProps {
}

const SignUpWindowComponent: FC<ISignUpWindowProps> = () => {
    const {userStore} = useStores();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [birthYear, setBirthYear] = useState<string>("");
    const [errorBirthYear, setErrorBirthYear] = useState<string | null>(null);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    setValue(event.target.value);
  };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const currentYear = new Date().getFullYear();
        const numericYear = Number(value);

        if (numericYear < 1900 || numericYear > currentYear) {
            setErrorBirthYear(`birthYear must be between 1900 and ${currentYear}.`);
        } else {
            setErrorBirthYear(null);
            setBirthYear(value);
        }
    };

    const singUp = async () => {
        const requestUrl = "/api/auth/register";

    // TODO implement dialog window
    if (password !== passwordConfirm) {
      console.log("check pass dialog TODO");
      return;
    }

        try {
            const res = await dataFetcher.post(requestUrl, {
                email,
                password,
                firstName,
                secondName,
                avatar,
                birthYear,
            });
            console.log("api sign-up res:", res.data);
            const resObj = await res.data.json();
            console.log("responseObj:", resObj);

            if (!res.data.ok) {
                throw new Error(resObj.message || "Some thing went wrong");
            }

        } catch (e) {
            console.log("ERROR! singIn", e);
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
        value={secondName}
        onChange={(event) => setInputValue(event, secondName, setSecondName)}
        className="mt-075"
      />

      <UiInputModal
        icon={"calendar"}
        key={"birthYear"}
        placeholder="Birth Year"
        value={birthYear}
        onChange={handleInputChange}
        className="mt-075"
      />

            {/*<input*/}
            {/*    className="ui-modal__input mt-075"*/}
            {/*    type={'text'}*/}
            {/*    placeholder={'First Name'}*/}
            {/*    value={password}*/}
            {/*    onChange={(event) => setInputValue(event, password, setPassword)}/>*/}

            {/*<input*/}
            {/*    className="ui-modal__input mt-075"*/}
            {/*    type={'text'}*/}
            {/*    placeholder={'First Name'}*/}
            {/*    value={password}*/}
            {/*    onChange={(event) => setInputValue(event, passwordConfirm, setPasswordConfirm)}/>*/}

            {/*<input*/}
            {/*    className="ui-modal__input mt-075"*/}
            {/*    type={'text'}*/}
            {/*    placeholder={'First Name'}*/}
            {/*    value={firstName}*/}
            {/*    onChange={(event) => setInputValue(event, firstName, setFirstName)}/>*/}

            {/*<input*/}
            {/*    className="ui-modal__input mt-075"*/}
            {/*    type={'text'}*/}
            {/*    placeholder={'Second Name'}*/}
            {/*    value={secondName}*/}
            {/*    onChange={(event) => setInputValue(event, secondName, setSecondName)}*/}
            {/*/>*/}

            {/*<input*/}
            {/*    className="ui-modal__input mt-075"*/}
            {/*    type="number"*/}
            {/*    name="birthYear"*/}
            {/*    placeholder="Birth Year"*/}
            {/*    value={birthYear}*/}
            {/*    onChange={handleInputChange}*/}
            {/*    min="1950"*/}
            {/*    max={new Date().getFullYear()}*/}
            {/*/>*/}

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
