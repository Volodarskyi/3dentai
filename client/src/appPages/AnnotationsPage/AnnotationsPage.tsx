"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import { AnnotationsWorkSpaceSection } from "@/appPages/AnnotationsPage/sections/AnnotationsWorkSpaceSection";

import "./AnnotationsPage.Styles.scss";

// interface IAnnotationsPageProps {
// }

const AnnotationsPageComponent: FC = () => {
  return (
    <div className="annotations">
      <div className="annotations__background"></div>
      <h1 className="annotations__title">Annotations</h1>
      <AnnotationsWorkSpaceSection />
    </div>
  );
};

export const AnnotationsPage = observer(AnnotationsPageComponent);
