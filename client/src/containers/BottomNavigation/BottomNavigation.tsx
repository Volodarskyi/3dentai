import { ReactNode } from "react";

import styles from "./bottomNavigation.module.scss";

interface BottomNavigationProps {
  readonly children: ReactNode;
}

const BottomNavigation = (props: BottomNavigationProps) => {
  const { children } = props;

  return <div className={styles.footer}>{children}</div>;
};

export default BottomNavigation;
