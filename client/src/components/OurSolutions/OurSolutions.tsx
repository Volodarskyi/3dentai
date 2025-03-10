"use client"; // Ensures this is a Client Component

import { FC } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+ App Router

import { UiIcon } from "@/components/UI/UiIcon/UiIcon";

import "./OurSolutions.Styles.scss";

export const OurSolutions: FC = () => {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.push(`/solutions#${id}`);

    // Smooth scroll after navigation
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="our-solutions">
      <div className="our-solutions__title flex w-100 content-center">
        <h3>Our Solutions</h3>
      </div>
      <div className="flex content-between mt-075">
        <div
          className="our-solutions__solution-item"
          onClick={() => handleNavigation("ai-mobile")}
        >
          <UiIcon name="ai-mobile" idIcon="ai-mobile" size={50} />
          <div>AI Mobile</div>
        </div>
        <div
          className="our-solutions__solution-item"
          onClick={() => handleNavigation("smart-camera")}
        >
          <UiIcon name="smart-camera" idIcon="smart-camera" size={50} />
          <div>Smart Camera</div>
        </div>
        <div
          className="our-solutions__solution-item"
          onClick={() => handleNavigation("dentist-hub")}
        >
          <UiIcon name="dentist-hub" idIcon="dentist-hub" size={50} />
          <div>Dentist Hub</div>
        </div>
      </div>
    </div>
  );
};
