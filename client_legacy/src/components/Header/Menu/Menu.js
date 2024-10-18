import {React} from 'react';
import {observer} from 'mobx-react';
import {Offcanvas} from 'react-bootstrap';
import {BsBank} from "react-icons/bs";
import {BiLogOut, BiSolidLogIn } from "react-icons/bi";
import {useRootStore} from "../../../stores";
import {ReactComponent as MenuIcon} from '../../../icons/menu.svg';
import {ReactComponent as AccountIcon} from '../../../icons/accont-icon.svg';

import './Menu.Styles.scss'
import {HeaderLink} from "../HeaderLink/HeaderLink";

export const MenuComponent = () => {
    const {authStore,uiStore} = useRootStore();

    return (
        <div className="menu">
            {authStore.firstName &&
                <div className="menu__account-name space-r-02">{authStore.firstName}</div>}
            <AccountIcon width={20} className="mg-r-1"/>
            <MenuIcon width={30} fill={'red'} onClick={uiStore.openMenu}/>

            <Offcanvas show={uiStore.menuIsShow} placement={'end'} onHide={uiStore.closeMenu}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <div className='menu__link-wrapper'>
                            <HeaderLink to="/"><BsBank className='mg-r-02'/>Home</HeaderLink>
                        </div>
                        <div className='menu__link-wrapper'>
                            <HeaderLink to="/dev"><BsBank className='mg-r-02'/>Dev</HeaderLink>
                        </div>

                        <div className='menu__link-wrapper'>
                            {authStore.isAuth ?
                                <div className="header-link" onClick={authStore.logout}>
                                    <BiLogOut className='mg-r-02'/>Log Out
                                </div> :
                                <div>
                                    <HeaderLink to="/login"><BiSolidLogIn className='mg-r-02'/>Login</HeaderLink>
                                </div>
                            }
                        </div>

                        {authStore.isAuth &&
                            <div className="menu__user-data">
                                <div><span className="font-bold">{`${authStore.role.toUpperCase()} : `}</span>
                                    {`${authStore.firstName} ${authStore.secondName}`}  </div>
                            </div>
                        }

                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export const Menu = observer(MenuComponent)
