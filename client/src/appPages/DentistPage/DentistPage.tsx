"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { DentistDashboardSection } from "@/appPages/DentistPage/sections/DentistDashboardSection";

import "./DentistPage.Styles.scss";
import {withAuth} from "@/hoc/WithAuth/withAuth";

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

const DentistPage = observer(DentistPageComponent);
export const DentistPageProtected = withAuth(DentistPage, ['dentist']) // ✅ here
