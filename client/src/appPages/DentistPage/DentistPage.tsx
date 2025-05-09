"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { DentistDashboardSection } from "@/appPages/DentistPage/sections/DentistDashboardSection";

import "./DentistPage.Styles.scss";

// interface IDentistPageProps {
// }

const DentistPageComponent: FC = () => {
  return (
    <div className="dentist">
      <h1 className="dentist__main-title">Dentist Page</h1>
      <DentistDashboardSection />
    </div>
  );
};

export const DentistPage = observer(DentistPageComponent);
