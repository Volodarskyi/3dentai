import {React} from 'react';
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import '../Header.Styles.scss'

export const HeaderLink = ({children, to}) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <>
            <Link
                className={match ?"header-link active": "header-link"}
                to={to}
            >
                {children}
            </Link>
        </>


    );
};
