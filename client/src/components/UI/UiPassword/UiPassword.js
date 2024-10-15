import {React} from 'react';
import {observer} from 'mobx-react';
import Form from 'react-bootstrap/Form';
import {InputGroup} from 'react-bootstrap';
import { IoMdEye } from "react-icons/io";

import './UiPassword.Styles.scss';
import {useRootStore} from "../../../stores";

const UiPasswordComponent = ({label,placeholder,password,setPassword}) => {
    const{uiStore} = useRootStore();
    const setInputValue = (event, value, setValue) => {
        setValue(event.target.value)
    }

    return (
        <div className="ui-password">
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">{label}</InputGroup.Text>
                {uiStore.passwordHide ?
                    <Form.Control
                        type={'password'}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder={placeholder}
                        value={password}
                        onChange={(event) => setInputValue(event, password, setPassword)}
                    />
                :
                    <Form.Control
                        type={'text'}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder={placeholder}
                        value={password}
                        onChange={(event) => setInputValue(event, password, setPassword)}
                    />
                }

            </InputGroup >
            <div
                className={uiStore.passwordHide ? "ui-password-icon" : "ui-password-icon active"}
                onClick={uiStore.passwordHideToggle}>
                <IoMdEye/>
            </div>
        </div>
    );
};

export const UiPassword = observer(UiPasswordComponent)
