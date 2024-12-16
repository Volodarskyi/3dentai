import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface IFooter {
  children: ReactNode;
}

const BottomNavigation = (props: IFooter) => {
  const { children } = props;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>{children}</div>
    </footer>
  );
};

export default BottomNavigation;
