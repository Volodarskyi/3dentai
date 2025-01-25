import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface BottomNavigationProps {
  readonly children: ReactNode;
}

const BottomNavigation = (props: BottomNavigationProps) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default BottomNavigation;
