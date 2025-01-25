"use client";

import { ReactNode } from "react";

import Header from "@/containers/Header";
import { StoreWrapper } from "@/store/provider";
import UiModal from "@/UI/UiModal/UiModal";

interface TemplateProps {
  readonly children: ReactNode;
}

function Template(props: TemplateProps) {
  const { children } = props;

  return (
    <StoreWrapper>
      <Header />
      {children}
      <UiModal />
    </StoreWrapper>
  );
}
export default Template;
