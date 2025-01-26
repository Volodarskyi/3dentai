import { FC } from "react";

import "./PageDecorations.Styles.scss";

interface IPageDecorationsProps {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  pentagonsLeft?: boolean;
  pentagonsRight?: boolean;
}

const PageDecorations: FC<IPageDecorationsProps> = ({
  topLeft = false,
  topRight = false,
  bottomLeft = false,
  bottomRight = false,
  pentagonsLeft = false,
  pentagonsRight = false,
}) => {
  return (
    <div className="page-decorations">
      <div className="page-decorations__wrappers">
        <img
          className="page-decorations__pentagons-left"
          src="/assets/images/dent-hitech-decor-pentagons-L.png"
          alt="decor-pentagons"
        />
        <img
          className="page-decorations__pentagons-right"
          src="/assets/images/dent-hitech-decor-pentagons-R.png"
          alt="decor-pentagons"
        />
        <img
          className="page-decorations__decor-top-left"
          src="/assets/images/dent-hitech-decor-TL.png"
          alt="decor-pentagons"
        />
        <img
          className="page-decorations__decor-top-right"
          src="/assets/images/dent-hitech-decor-TR.png"
          alt="decor-pentagons"
        />
        <img
          className="page-decorations__decor-bottom-left"
          src="/assets/images/dent-hitech-decor-BL.png"
          alt="decor-pentagons"
        />
        <img
          className="page-decorations__decor-bottom-right"
          src="/assets/images/dent-hitech-decor-BR.png"
          alt="decor-pentagons"
        />
        <div className="page-decorations__circule-animation"></div>
      </div>
    </div>
  );
};

export default PageDecorations;
