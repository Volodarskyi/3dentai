"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
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
    </StoreWrapper>
  );
}

export default Template;
