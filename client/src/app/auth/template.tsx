import { ReactNode } from "react";

import AuthNavigation from "@/components/AuthNavigation";
import BottomNavigation from "@/components/BottomNavigation";

interface TemplateProps {
  readonly children: ReactNode;
}

const Template = (props: TemplateProps) => {
  const { children } = props;
  return (
    <>
      {children}
      <BottomNavigation>
        <AuthNavigation />
      </BottomNavigation>
    </>
  );
};

export default Template;
