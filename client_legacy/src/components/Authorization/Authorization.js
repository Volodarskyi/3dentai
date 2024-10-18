import {React, useState} from 'react';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import {InputGroup} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import {UiPassword} from "../UI/UiPassword/UiPassword";
import {useRootStore} from "../../stores";
import {configClient} from "../../configClient/configClient";
import {fetchService} from "../../services/fetchService";

import './Authorization.Styles.scss'
const AuthorizationComponent = () => {
    let navigate = useNavigate();
    const {dialogStore,authStore} = useRootStore()
    const [key, setKey] = useState('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [avatar, setAvatar] = useState('');

    const setInputValue = (event, value, setValue) => {
        setValue(event.target.value)
    }

    const navigateToMain = ()=>{
        return navigate("/")
    }
    const singIn = async () => {
        dialogStore.showLoader();
        const requestUrl = '/api/auth/register'

        if(password !== passwordConfirm){
            return dialogStore.setResult({result:'ERROR',message:'Password & Confirm Password doesn\'t match',details:'Check password'})
        }

        try {
            const res = await fetchService.post(requestUrl,{email, password, firstName, secondName,avatar})
            const responseObj = await res.json();
            console.log('responseObj:', responseObj)

            if (!res.ok) {
                throw new Error(responseObj.message || 'Some thing went wrong')
            }

            dialogStore.setResult(responseObj)
        } catch (e) {
            console.log('ERROR! singIn', e)
            dialogStore.setResult({result:'ERROR',message:'Sing In failed',details: String(e)})
        }
    }

    const login = async () => {
        console.log('login')
        dialogStore.showLoader();
        const requestUrl = 'api/auth/login'
        console.log('EMAIL:',email)
        console.log('PASS:',password)

        try {
            const res = await fetchService.post(requestUrl,{email, password})
            const responseObj = await res.json();

            if (!res.ok) {
                throw new Error(responseObj.details || 'Some thing went wrong')
            }

            console.log('LOGIN:', responseObj)

            dialogStore.setResult(responseObj, navigateToMain)
            localStorage.setItem(configClient.TOKEN_ITEM_NAME,responseObj.data.token)
            authStore.authorization()
        } catch (e) {
            console.log('ERROR! Login', e)
            dialogStore.setResult({result:'ERROR',message:'login failed',details: String(e)})
        }
    }



    return (
        <div className="authorization">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="login" title="Login" className='pd-8'>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text
                            id="inputGroup-sizing-sm"
                        >
                            Email
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            value={email}
                            onChange={(event) => setInputValue(event, email, setEmail)}
                        />
                    </InputGroup>
                    <UiPassword label={'Password'} password={password} setPassword={setPassword}/>
                    <div><Button onClick={login} className="w-100">Login</Button></div>
                </Tab>
                <Tab eventKey="register" title="Sing In" className='pd-8'>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder={'youremail@address.com'}
                            value={email}
                            onChange={(event) => setInputValue(event, email, setEmail)}
                        />
                    </InputGroup>
                    <UiPassword
                        label={'Password'}
                        placeholder={'Password'}
                        password={password}
                        setPassword={setPassword}/>

                    <UiPassword
                        label={'Confirm Pass'}
                        placeholder={'Confirm Password'}
                        password={passwordConfirm}
                        setPassword={setPasswordConfirm}/>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">First Name</InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder={'type your first name'}
                            value={firstName}
                            onChange={(event) => setInputValue(event, firstName, setFirstName)}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Second Name</InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder={'type your second name'}
                            value={secondName}
                            onChange={(event) => setInputValue(event, secondName, setSecondName)}
                        />
                    </InputGroup>



                    <div className="mg-top-1"><Button onClick={singIn} className="w-100">Sing In</Button></div>
                </Tab>
            </Tabs>

        </div>
    );
};

export const Authorization = observer(AuthorizationComponent)
