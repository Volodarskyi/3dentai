"use client";

import { PageDecorations } from "@/components/PageDecorations/PageDecorations";
import AuthNavigation from "@/containers/AuthNavigation";
import BottomNavigation from "@/containers/BottomNavigation";

import styles from "./home.module.scss";

const HomeScreen = () => {
  return (
    <>
      {/*<PageDecorations />*/}
      <div className={styles.home}>
        <div className={styles.empty} />
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>3DentAI</h1>
          </div>
          <div className={styles.description}>
            <h2>
              Primary diagnosis of tooth and gum diseases at home using a
              compact camera and AI
            </h2>
          </div>
          <img
            className={styles.img}
            src="/assets/images/3dentai-animation-main_v03.gif"
            alt="Loading Animation"
          />
        </div>
        <div className={styles.empty} />
      </div>
      <BottomNavigation>
        <AuthNavigation />
      </BottomNavigation>
    </>
  );
};

export default HomeScreen;
