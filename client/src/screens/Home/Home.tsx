"use client";

import AuthNavigation from "@/components/AuthNavigation";
import BottomNavigation from "@/components/BottomNavigation";

import styles from "./home.module.scss";

const HomeScreen = () => {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.home__content}>
          <div className={styles.home__content__title}>
            <h1>3DentAI</h1>
          </div>
          <div className={styles.home__content__description}>
            <h2>
              Primary diagnosis of tooth and gum diseases at home using a
              compact camera and AI
            </h2>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.home__content__animation}
            src="/assets/images/3dentai-animation-main_v02.gif"
            alt="Loading Animation"
          />
        </div>
      </div>
      <BottomNavigation>
        <AuthNavigation />
      </BottomNavigation>
    </>
  );
};

export default HomeScreen;
