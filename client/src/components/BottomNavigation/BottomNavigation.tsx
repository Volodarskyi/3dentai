import { ReactNode } from "react";

import "./styles.module.scss";

interface BottomNavigationProps {
  readonly children: ReactNode;
}

const BottomNavigation = (props: BottomNavigationProps) => {
  const { children } = props;

  return <div className={"authNavigation"}>{children}</div>;
};

export default BottomNavigation;
