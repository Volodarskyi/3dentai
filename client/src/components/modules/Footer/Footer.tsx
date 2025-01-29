import styles from "@/components/BottomNavigation/styles.module.scss";

import AuthNavigation from "./components/AuthNavigation";

const Footer = () => {
  return (
    <div className={styles.container}>
      <AuthNavigation />
    </div>
  );
};

export default Footer;
