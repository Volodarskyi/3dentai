import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
      <Footer />
    </StoreWrapper>
  );
}

export default Template;
