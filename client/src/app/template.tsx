"use client";

import { ReactNode } from "react";

import Header from "@/components/Header";
import UiModal from "@/containers/UiModal";
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
