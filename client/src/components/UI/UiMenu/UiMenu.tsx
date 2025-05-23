"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import {useStores} from "@/hooks/useStores";
import {Drawer} from "antd";
import {useUserData} from "@/hooks/useUserData";
import {clearTokens} from "@/utils/cookieUtils";
import {useRouter} from "next/navigation";

import './UiMenu.Styles.scss';

const UiMenuComponent: React.FC = () => {
    const { menuStore } = useStores();
    const router = useRouter()
    const { firstName, lastName, role, isAuth } = useUserData();

    const signOut = ()=>{
        clearTokens()
        menuStore.closeMenu()
        router.push("/");
    }

    return (
        <>
            <Drawer
                className={'ui-menu'}
                // title="Menu"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={menuStore.closeMenu}
                open={menuStore.isShow}
            >
                <div>MENU</div>
                <div className="ui-menu__account">
                    {role ? <div>{role}:</div> : null}
                    <div className="ui-menu__account-name">
                        {firstName ? <div>{firstName}</div> : null}
                        {lastName ? <div>{lastName}</div> : null}
                    </div>
                </div>

                {isAuth ? <div className="ui-menu__link" onClick={signOut}> Sign Out</div> : null}
            </Drawer>
        </>
    );
};

export const UiMenu = observer(UiMenuComponent);
