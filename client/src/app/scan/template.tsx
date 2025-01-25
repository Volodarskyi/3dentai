import { ReactNode } from "react";

import BottomNavigation from "@/containers/BottomNavigation";
import Navigation from "@/screens/Scan/components/Navigation";

interface TemplateProps {
  readonly children: ReactNode;
}

const Template = (props: TemplateProps) => {
  const { children } = props;
  return (
    <>
      {children}
      <BottomNavigation>
        <Navigation />
      </BottomNavigation>
    </>
  );
};

export default Template;
