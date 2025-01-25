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
    <div className={styles.pageDecorations}>
      <div className={styles.pageDecorations__wrapper}>
        <img
          className={styles.pageDecorations__pentagonsLeft}
          src="/assets/images/dent-hitech-decor-pentagons-L.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pageDecorations__pentagonsRight}
          src="/assets/images/dent-hitech-decor-pentagons-R.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pageDecorations__decorTopLeft}
          src="/assets/images/dent-hitech-decor-TL.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pageDecorations__decorTopRight}
          src="/assets/images/dent-hitech-decor-TR.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pageDecorations__decorBottomLeft}
          src="/assets/images/dent-hitech-decor-BL.png"
          alt="decor-pentagons"
        />
        <img
          className={styles.pageDecorations__decorBottomRight}
          src="/assets/images/dent-hitech-decor-BR.png"
          alt="decor-pentagons"
        />
        <div className={styles.pageDecorations__circuleAnimation} />
      </div>
    </div>
  );
};
