
import React,{FC, useState} from 'react';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import {InputGroup} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

import {UiPassword} from "@/components/UI/UiPassword/UiPassword";
import {apiClient} from "@/api/apiClient";
import {useStores} from "@/hooks/useStores";
import {EAuth} from "@/types/auth";
const AuthorizationComponent = () => {
    const {userStore} = useStores()
    const [key, setKey] = useState<string>('register');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [avatar, setAvatar] = useState('');

    // @ts-ignore
    const setInputValue = (event, value, setValue) => {
        setValue(event.target.value)
    }

    const navigateToMain = ()=>{
        console.log('navigate to scan')
    }
    const singIn = async () => {
        const requestUrl = '/api/auth/register'
        //
        // if(password !== passwordConfirm){
        //     return dialogStore.setResult({result:'ERROR',message:'Password & Confirm Password doesn\'t match',details:'Check password'})
        // }

        try {
            const res = await apiClient.post(requestUrl,{email, password, firstName, secondName,avatar})
            console.log('api signin res:',res.data)
            const resObj = await res.data.json();
            console.log('responseObj:', resObj)

            if (!res.data.ok) {
                throw new Error(resObj.message || 'Some thing went wrong')
            }

            // dialogStore.setResult(responseObj)
        } catch (e) {
            console.log('ERROR! singIn', e)
            // dialogStore.setResult({result:'ERROR',message:'Sing In failed',details: String(e)})
        }
    }

    const login = async () => {
        console.log('login')
        // dialogStore.showLoader();
        const requestUrl = 'api/auth/login'
        console.log('EMAIL:',email)
        console.log('PASS:',password)

        try {
            const res = await apiClient.post(requestUrl,{email, password})
            console.log('api login res:',res)
            const responseObj = await res.data.json();

            if (!res.data.ok) {
                throw new Error(responseObj.details || 'Some thing went wrong')
            }

            console.log('LOGIN:', responseObj)

            // dialogStore.setResult(responseObj, navigateToMain)
            localStorage.setItem(EAuth.TOKEN_ITEM_NAME,responseObj.data.token)
            userStore.authorization()
        } catch (e) {
            console.log('ERROR! Login', e)
            // dialogStore.setResult({result:'ERROR',message:'login failed',details: String(e)})
        }
    }



    // @ts-ignore
    return (
        <div className="authorization" style={{background:"grey"}}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => k && setKey(k)}
                className="mb-3"
            >
                {/*<Tab eventKey="login" title="Login" className='pd-8'>*/}
                {/*    <InputGroup size="sm" className="mb-3">*/}
                {/*        <InputGroup.Text*/}
                {/*            id="inputGroup-sizing-sm"*/}
                {/*        >*/}
                {/*            Email*/}
                {/*        </InputGroup.Text>*/}
                {/*        <Form.Control*/}
                {/*            aria-label="Small"*/}
                {/*            aria-describedby="inputGroup-sizing-sm"*/}
                {/*            value={email}*/}
                {/*            onChange={(event) => setInputValue(event, email, setEmail)}*/}
                {/*        />*/}
                {/*    </InputGroup>*/}
                {/*    /!*<UiPassword label={'Password'} password={password} setPassword={setPassword}/>*!/*/}
                {/*    <div>*/}
                {/*        <Button onClick={login} className="w-100">Login</Button>*/}
                {/*    </div>*/}
                {/*</Tab>*/}
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



                    <div className="mg-top-1"><button onClick={singIn} className="w-100">Sing In</button></div>
                </Tab>
            </Tabs>

        </div>
    );
};

export const Authorization = observer(AuthorizationComponent)
