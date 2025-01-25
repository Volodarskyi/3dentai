"use client";

import { ReactNode } from "react";

import UiModal from "@/components/UiModal/UiModal";
import Header from "@/containers/Header";
import { StoreWrapper } from "@/store/provider";

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
