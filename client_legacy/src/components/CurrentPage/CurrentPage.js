import {React} from 'react';
import {observer} from 'mobx-react';

import './CurrentPage.Styles.scss';
import {useCurrentPath} from "../../hooks/navigate.hook";

export const CurrentPageComponent = () => {
    const currentPath = useCurrentPath();

    const pathTranslator = {
        "/":"Home",
        "/login":"Authorization",
        "/user":"User Details",
        "/dev":"Dev Page"
    }

    return (
        <div className="current-page">
            {pathTranslator[currentPath]}
        </div>
    );
};

export const CurrentPage = observer(CurrentPageComponent)
