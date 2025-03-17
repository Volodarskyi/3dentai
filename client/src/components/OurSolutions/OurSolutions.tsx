"use client";

import { FC } from "react";
import Link from "next/link";

import { UiIcon } from "@/components/UI/UiIcon/UiIcon";

import "./OurSolutions.Styles.scss";

export const OurSolutions: FC = () => {
  return (
    <div className="our-solutions">
      <div className="our-solutions__title flex w-100 content-center">
        <h3>Our Solutions</h3>
      </div>
      <div className="flex content-between mt-075">
        <Link
          href={"/solutions#ai-mobile"}
          className="our-solutions__solution-item"
        >
          <UiIcon name="ai-mobile" idIcon="ai-mobile" size={50} />
          <div>AI Mobile</div>
        </Link>
        <Link
          href={"/solutions#smart-camera"}
          className="our-solutions__solution-item"
        >
          <UiIcon name="smart-camera" idIcon="smart-camera" size={50} />
          <div>Smart Camera</div>
        </Link>
        <Link
          href={"/solutions#dentist-hub"}
          className="our-solutions__solution-item"
        >
          <UiIcon name="dentist-hub" idIcon="dentist-hub" size={50} />
          <div>Dentist Hub</div>
        </Link>
      </div>
    </div>
  );
};
