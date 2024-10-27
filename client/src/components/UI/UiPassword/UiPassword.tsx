import React, { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
// import { IoMdEye } from "react-icons/io";


interface UiPasswordComponentProps {
    label: string;
    placeholder: string;
    password: string;
    setPassword: (value: string) => void;
}

const UiPasswordComponent: React.FC<UiPasswordComponentProps> = ({ label, placeholder, password, setPassword }) => {
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
                    type={passHide ? 'password' : 'text'}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder={placeholder}
                    value={password}
                    onChange={setInputValue}
                />
            </InputGroup>
            <div
                className={passHide ? "ui-password-icon" : "ui-password-icon active"}
                onClick={togglePassHide}>
                <span>{passHide ? 'hide' : 'show'}</span>
                {/*<IoMdEye/>*/}
            </div>
        </div>
    );
};

export const UiPassword = observer(UiPasswordComponent);
