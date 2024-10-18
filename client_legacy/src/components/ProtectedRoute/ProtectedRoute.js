import {React} from 'react';
import { observer } from 'mobx-react';
import {Navigate, useLocation} from "react-router-dom";
import {useRootStore} from "../../stores";

const ProtectedRouteComponent = ({children}) => {
    const {authStore} = useRootStore();
    let location = useLocation();

    if (!authStore.isAuth) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children
};

export const ProtectedRoute = observer(ProtectedRouteComponent)
