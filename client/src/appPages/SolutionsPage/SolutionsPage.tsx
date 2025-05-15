"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { AiMobileSection } from "@/appPages/SolutionsPage/sections/AiMobileSection";
import { DentistsHubSection } from "@/appPages/SolutionsPage/sections/DentistsHubSection";
import { SmartCameraSection } from "@/appPages/SolutionsPage/sections/SmartCameraSection";

import "./SolutionsPage.Styles.scss";

// interface ISolutionsScreenProps {
// }

const SolutionsScreenComponent: FC = () => {
  return (
    <div className="solution">
      <div className={"background"} />
      <h1 className="solution__title">Our Solution</h1>
      <AiMobileSection />
      <SmartCameraSection />
      <DentistsHubSection />
    </div>
  );
};

export const SolutionsPage = observer(SolutionsScreenComponent);
