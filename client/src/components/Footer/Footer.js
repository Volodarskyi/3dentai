import {React} from 'react';
import {observer} from 'mobx-react';
import {useCurrentPath} from "../../hooks/navigate.hook";

import './Footer.Styles.scss'

const FooterComponent = () => {
    const currentPath = useCurrentPath();

    return (
        <div className='footer'>
            {currentPath === '/' && <div>step navigation</div>}
        </div>
    );
};

export const Footer = observer(FooterComponent)
