import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import dataFetcher from "@/api/dataFetcher";
import {useStores} from "@/hooks/useStores";
import UiPassword from "@/components/UI/UiPassword/UiPassword";

import'../UiModal.Styles.scss';

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
        setValue: React.Dispatch<React.SetStateAction<string>>
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

        if (password !== passwordConfirm) {
            console.log('check pass dialog')
            return
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
        <>
            <input
                className="ui-modal__input"
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(event) => setInputValue(event, email, setEmail)}/>

            <UiPassword
                password={password}
                setPassword={setPassword}
            />

            <UiPassword
                password={passwordConfirm}
                setPassword={setPasswordConfirm}/>

            <input
                className="ui-modal__input"
                type={'text'}
                placeholder={'First Name'}
                value={firstName}
                onChange={(event) => setInputValue(event, firstName, setFirstName)}/>

            <input
                className="ui-modal__input"
                type={'text'}
                placeholder={'Second Name'}
                value={secondName}
                onChange={(event) => setInputValue(event, secondName, setSecondName)}
            />

            <input
                className="ui-modal__input"
                type="number"
                name="birthYear"
                placeholder="YYYY"
                value={birthYear}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
            />

            <button onClick={singUp}>Confirm</button>
        </>
    );
};
export const SignUpWindow = observer(SignUpWindowComponent)
