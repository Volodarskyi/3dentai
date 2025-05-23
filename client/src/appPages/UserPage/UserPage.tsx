"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import {UserDashboardSection} from "@/appPages/UserPage/sections/UserDashboardSection";

import {withAuth} from "@/hoc/WithAuth/withAuth";
import {EUserRole} from "@/types/enums/userEnums";
import {useUserData} from "@/hooks/useUserData";

import "./UserPage.Styles.scss";

// interface IDentistPageProps {
// }

const UserPageComponent: FC = () => {
    const{firstName,lastName}=useUserData()

    return (
        <div className="user-page">
            <div className="w-100 flex content-center mt-15">
                <h1 className="user-page__main-title">{`${firstName} ${lastName}`}</h1>
            </div>
            <UserDashboardSection/>
        </div>
    );
};

const UserPage = observer(UserPageComponent);
export const UserPageProtected = withAuth(UserPage, [EUserRole.USER]) // ✅ here