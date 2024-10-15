import {React} from 'react';
import { observer } from 'mobx-react';
import {Outlet} from "react-router-dom";

import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {Dialog} from "../../components/Dialog/Dialog";
import {CurrentPage} from "../../components/CurrentPage/CurrentPage";

 const MainLayoutComponent = () => {
    return (
        <>
            <Header/>
            <CurrentPage/>
            <div className="page media-wrapper">
                <Dialog/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export const MainLayout = observer(MainLayoutComponent)
