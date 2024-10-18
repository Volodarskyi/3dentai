import {useEffect, useState} from "react";
import {observer} from 'mobx-react';
import {Route, Routes} from 'react-router-dom';
import {useRootStore} from "./stores";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {MainPage} from "./pages/MainPage/MainPage";
import {DevPage} from "./pages/DevPage/DevPage";
import {NotfoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {MainLayout} from "./pages/MainLayout/MainLayout";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import {InitApp} from "./components/InitApp/InitApp";
import {UiModalConfirm} from "./components/UI/UiModalConfirm/UiModalConfirm";
import {UiModalAddUrl} from "./components/UI/UiModalAddUrl/UiModalAddUrl";

import './App.scss';

const AppComponent = () => {
    const {authStore} = useRootStore();
    const [init, setInit] = useState(true);

    useEffect(() => {
        authStore.authorization()
        setInit(false)
    }, [])

    if (init) {
        return (<InitApp/>)
    }

    return (
        <div className="App q-cards">
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/dev" element={<DevPage/>}/>

                    <Route path="*" element={<NotfoundPage/>}/>
                </Route>
            </Routes>
            <UiModalConfirm/>
            <UiModalAddUrl/>
        </div>
    );
}

export const App = observer(AppComponent)
