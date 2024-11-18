import {FC} from 'react';
import {observer} from "mobx-react-lite";

interface ISignInWindowProps {
}

const LogInWindowComponent: FC<ISignInWindowProps> = () => {
    return (
        <div>
            LogInWindow
        </div>
    );
};
export const LogInWindow = observer(LogInWindowComponent)
