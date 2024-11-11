import React, { ChangeEvent, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface PasswordProps {
  label: string;
  placeholder: string;
  password: string;
  setPassword: (value: string) => void;
}

const Password = ({
  label,
  placeholder,
  password,
  setPassword,
}: PasswordProps) => {
  const [passHide, setPassHide] = useState(true);

  const setInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePassHide = () => {
    setPassHide(!passHide);
  };

  return (
    <div className="ui-password">
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">{label}</InputGroup.Text>
        <Form.Control
          type={passHide ? "password" : "text"}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={placeholder}
          value={password}
          onChange={setInputValue}
        />
      </InputGroup>
      <div
        className={passHide ? "ui-password-icon" : "ui-password-icon active"}
        onClick={togglePassHide}
      >
        <span>{passHide ? "hide" : "show"}</span>
        {/*<IoMdEye/>*/}
      </div>
    </div>
  );
};

export default Password;
