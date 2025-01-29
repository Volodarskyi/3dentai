"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/modules/Footer";
import { UiModal } from "@/components/UI/UiModal/UiModal";
import { StoreWrapper } from "@/store/provider";

interface TemplateProps {
  readonly children: ReactNode;
}

function Template(props: TemplateProps) {
  const { children } = props;

  const pathname = usePathname();

  if (pathname === "/scan") {
    console.log("display or hide footer");
  }

  return (
    <StoreWrapper>
      <Header />
      {children}
      <UiModal />
      <Footer />
    </StoreWrapper>
  );
}
export default Template;
