"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { AiMobileSection } from "@/screens/Solutions/sections/AiMobileSection";
import { DentistsHubSection } from "@/screens/Solutions/sections/DentistsHubSection";
import { SmartCameraSection } from "@/screens/Solutions/sections/SmartCameraSection";

// interface ISolutionsScreenProps {
// }

const SolutionsScreenComponent: FC = () => {
  return (
    <div>
      <AiMobileSection />
      <SmartCameraSection />
      <DentistsHubSection />
    </div>
  );
};

export const SolutionsScreen = observer(SolutionsScreenComponent);
