"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import {UserDashboardSection} from "@/appPages/UserPage/sections/UserDashboardSection";

import "./UserPage.Styles.scss";


// interface IDentistPageProps {
// }

const UserPageComponent: FC = () => {
    return (
        <div className="user-page">
            <div className="w-100 flex content-center mt-15">
                <h1 className="user-page__main-title">User Name</h1>
            </div>
            <UserDashboardSection/>
        </div>
    );
};

export const UserPage = observer(UserPageComponent);
