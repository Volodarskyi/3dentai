import { FC } from "react";

import styles from "./decorations.module.scss";

interface IPageDecorationsProps {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  pentagonsLeft?: boolean;
  pentagonsRight?: boolean;
}

export const PageDecorations: FC<IPageDecorationsProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          className={styles.pentagonsLeft}
          src="/assets/images/dent-hitech-decor-pentagons-L.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pentagonsRight}
          src="/assets/images/dent-hitech-decor-pentagons-R.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.decorTopLeft}
          src="/assets/images/dent-hitech-decor-TL.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.decorTopRight}
          src="/assets/images/dent-hitech-decor-TR.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.decorBottomLeft}
          src="/assets/images/dent-hitech-decor-BL.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.decorBottomLeft}
          src="/assets/images/dent-hitech-decor-BR.png"
          alt="decor-pentagons"
        />
        <div className={styles.circuleAnimation} />
      </div>
    </div>
  );
};
