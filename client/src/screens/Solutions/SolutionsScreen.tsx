"use client";
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { AiMobileSection } from "@/screens/Solutions/sections/AiMobileSection";
import { DentistsHubSection } from "@/screens/Solutions/sections/DentistsHubSection";
import { SmartCameraSection } from "@/screens/Solutions/sections/SmartCameraSection";

import "./SolutionsScreen.styles.scss";

// interface ISolutionsScreenProps {
// }

const SolutionsScreenComponent: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        console.log(id); // Remove #
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }
  }, [router]);

  // Smooth scroll after navigation

  return (
    <div className="solution">
      <h1 className="solution__title">Our Solution</h1>
      <AiMobileSection />
      <SmartCameraSection />
      <DentistsHubSection />
    </div>
  );
};

export const SolutionsScreen = observer(SolutionsScreenComponent);
