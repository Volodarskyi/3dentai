import {React} from 'react';
import { observer } from 'mobx-react';
import {Authorization} from "../../components/Authorization/Authorization";

const LoginPageComponent = () => {
    return (
        <>
            <Authorization/>
        </>
    );
};

export const LoginPage = observer(LoginPageComponent)


