"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import {UserDashboardSection} from "@/appPages/UserPage/sections/UserDashboardSection";

import "./UserPage.Styles.scss";
import {withAuth} from "@/hoc/WithAuth/withAuth";


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

const UserPage = observer(UserPageComponent);
export const UserPageProtected = withAuth(UserPage, ['user']) // ✅ here