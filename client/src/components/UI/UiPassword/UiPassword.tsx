import React, {ChangeEvent, useState} from "react";
import './UiPassword.Styles.scss';

import "./UiPassword.Styles.scss";

interface PasswordProps {
    password: string;
    setPassword: (value: string) => void;
}

const Password = ({ password, setPassword }: PasswordProps) => {
  const [passHide, setPassHide] = useState(true);

    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const togglePassHide = () => {
        setPassHide(!passHide);
    };

    return (
        <div className="ui-password">

            <input
                type={passHide ? "password" : "text"}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder={"Password"}
                value={password}
                onChange={setInputValue}
            />

      <span
        className={passHide ? "ui-password-icon" : "ui-password-icon active"}
        onClick={togglePassHide}
      >
        {passHide ? "hide" : "show"}
      </span>
    </div>
    );
};

export default Password;
