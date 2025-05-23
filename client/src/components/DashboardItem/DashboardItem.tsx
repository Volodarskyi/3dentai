"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import {UiIcon} from "@/components/UI/UiIcon/UiIcon";
import {useRouter} from "next/navigation";

import "./DashboardItem.Styles.scss";

interface IDashboardItem {
    icon: string;
    title: string;
    description: string;
    linkTo: string;
}

const DashboardItemComponent: FC<IDashboardItem> = ({icon,title,description,linkTo}) => {
    const router = useRouter();
    const goTo = ()=>{
        router.push(linkTo);
    }

    return (
        <div className="dashboard-item" onClick={goTo}>
            <div className="dashboard-item__icon">
                <UiIcon name={icon} size={72}/>
            </div>
            <div className="dashboard-item__wrapper">
                <div className="dashboard-item__wrapper-title">{title}</div>
                <div className="dashboard-item__wrapper-description">{description}</div>
            </div>
        </div>
    );
};

export const DashboardItem = observer(DashboardItemComponent);
