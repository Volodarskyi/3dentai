import {React} from 'react';
import { observer } from 'mobx-react';

import './Header.Styles.scss'
import {LogoApp} from "./LogoApp/LogoApp";
import {Menu} from "./Menu/Menu";

const HeaderComponent = () => {
    return (
        <div className='header'>
            <LogoApp/>
            <div className="nav-main">
                {/*<div>*/}
                {/*    <HeaderLink to="/">Home</HeaderLink>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <HeaderLink to="/statistics">Statistics</HeaderLink>*/}
                {/*</div>*/}
            </div>
            <Menu/>
        </div>
    );
};

export const Header = observer(HeaderComponent)
