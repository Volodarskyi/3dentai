import {FC} from 'react';
import {observer} from "mobx-react-lite";

interface ISignInWindowProps {
}

const SignInWindowComponent: FC<ISignInWindowProps> = () => {
    return (
        <div>
            SignInWindow
        </div>
    );
};
export const SignInWindow = observer(SignInWindowComponent)
