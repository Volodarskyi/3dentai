import { FC } from "react";

import "./UiIcon.Styles.scss";

interface IUiIconProps {
  name: string;
  size?: number | undefined;
  className?: string;
}

const UiIconComponent: FC<IUiIconProps> = ({
  name,
  size = 24,
  className = "",
}) => {
  const src = `/assets/icons/${name}.png`;

  return (
    <img
      src={src}
      alt={`icon-${name}`}
      width={size}
      height={size}
      className={`ui-icon ${className}`}
    />
  );
};

export default UiIconComponent;
