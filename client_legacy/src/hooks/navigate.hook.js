import {createSearchParams, useNavigate, useLocation} from "react-router-dom";

export const useNavigateParams = () => {
    const navigate = useNavigate();

    return (pathname, params) => {
        const path = {
            pathname,
            search: createSearchParams(params).toString()
        };
        console.log('path:', path)
        navigate(path);
    };
};

const routes = [{ path: "/members/:id" }]
export const useCurrentPath = () => {
    const location = useLocation()

    return location.pathname
}
