import {FC} from 'react';
import {observer} from "mobx-react-lite";
import './UiIcon.Styles.scss';
interface IUiIconProps {
    name:string;
    size?:number | undefined
}

const UiIconComponent: FC<IUiIconProps> = ({ name, size = 24 }) => {
    const src = `/assets/icons/${name}.png`;

    return (
        <img
            src={src}
            alt={`icon-${name}`}
            width={size}
            height={size}
            className="ui-icon"
        />
    );
};

export const UiIcon = observer(UiIconComponent)
