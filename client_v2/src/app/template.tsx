import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/services/index";

interface TemplateProps {
  readonly children: ReactNode;
}

function Template(props: TemplateProps) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Template;
