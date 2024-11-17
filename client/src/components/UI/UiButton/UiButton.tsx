import {FC} from 'react';
import {observer} from "mobx-react-lite";
import './UiButton.Styles.scss';

interface IUiButtonProps {
    text: string;
    onClick: () => void
    width?: number | undefined;
    height?: number | undefined;
    disabled?: boolean | undefined;
}

const UiButtonComponent: FC<IUiButtonProps> = ({text, onClick, width = 150, height = 45, disabled=false}) => {
    return (
        <button
            onClick={onClick}
            className="ui-btn ui-btn__action"
            style={{width: `${width}px`, height: `${height}px`}}
            disabled={disabled}>
            {text}
        </button>
    );
};

export const UiButton = observer(UiButtonComponent)
