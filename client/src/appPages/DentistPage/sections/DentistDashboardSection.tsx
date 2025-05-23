"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import "../DentistPage.Styles.scss";
import {DashboardItem} from "@/components/DashboardItem/DashboardItem";

const DentistDashboardSectionComponent: FC = () => {
  return (
      <div className="w-100 flex content-center mt-1">
          <div className="dentist__dashboard">
              <DashboardItem key={'dash-scan'} icon={'dash-scan'} title={'SCAN LIST'} description={'new scans: 12'} linkTo={"/scans"}/>
              <DashboardItem key={'dash-mail'} icon={'dash-mail'} title={'MY MESSAGES'} description={'messages: 7'} linkTo={"/dentist"}/>
              <DashboardItem key={'dash-annotations'} icon={'dash-annotations'} title={'ANNOTATIONS'} description={'new photo: 123 '} linkTo={"/dentist/annotations"}/>
              <DashboardItem key={'dash-settings'} icon={'dash-settings'} title={'ACCOUNT SETTINGS'} description={'packet: "M"'} linkTo={"/dentist"}/>
          </div>
      </div>
  );
};

export const DentistDashboardSection = observer(
  DentistDashboardSectionComponent,
);
