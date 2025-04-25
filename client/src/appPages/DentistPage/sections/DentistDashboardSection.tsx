"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import "../DentistPage.Styles.scss";

const DentistDashboardSectionComponent: FC = () => {
  return (
    <div className="dentist__dashboard">
      Dentist Dashboard Section Component
    </div>
  );
};

export const DentistDashboardSection = observer(
  DentistDashboardSectionComponent,
);
