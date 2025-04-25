"use client";
import { FC } from "react";
import { observer } from "mobx-react-lite";

import "../AnnotationsPage.Styles.scss";

const AnnotationsWorkSpaceSectionComponent: FC = () => {
  return <div className="annotations__workspace">AnnotationsSection</div>;
};

export const AnnotationsWorkSpaceSection = observer(
  AnnotationsWorkSpaceSectionComponent,
);
