import {FC} from 'react';
import {observer} from "mobx-react-lite";

import './UiIntputModal.Styles.scss';

interface IUiInputModalProps {
}

export const UiInputModalComponent: FC<IUiInputModalProps> = () => {
    return (
        <div>
            UiInputModalComponent
        </div>
    );
};
export const UiInputModal = observer(UiInputModalComponent)
