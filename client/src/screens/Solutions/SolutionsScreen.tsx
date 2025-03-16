"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { AiMobileSection } from "@/screens/Solutions/sections/AiMobileSection";
import { DentistsHubSection } from "@/screens/Solutions/sections/DentistsHubSection";
import { SmartCameraSection } from "@/screens/Solutions/sections/SmartCameraSection";

import "./SolutionsScreen.styles.scss";

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

export const SolutionsScreen = observer(SolutionsScreenComponent);
