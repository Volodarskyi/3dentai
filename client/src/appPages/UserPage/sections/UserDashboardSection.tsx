"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import "../UserPage.Styles.scss";
import {DashboardItem} from "@/components/DashboardItem/DashboardItem";

const UserDashboardSectionComponent: FC = () => {
    return (
        <div className="w-100 flex content-center mt-1">
            <div className="user-page__dashboard">
                <DashboardItem key={'dash-scan'} icon={'dash-scan'} title={'NEW SCAN'} description={'last scan: 2.05.2025'} linkTo={"/scan"}/>
                <DashboardItem key={'dash-mail'} icon={'dash-mail'} title={'MY MESSAGES'} description={'messages: 2'} linkTo={"/scans"}/>
                <DashboardItem key={'dash-history'} icon={'dash-history'} title={'SCANs HISTORY'} description={'actions: 2'} linkTo={"/user"}/>
                <DashboardItem key={'dash-settings'} icon={'dash-settings'} title={'ACCOUNT SETTINGS'} description={'valid: 2.05.2025'} linkTo={"/user"}/>
            </div>
        </div>
    );
};

export const UserDashboardSection = observer(
    UserDashboardSectionComponent,
);
