import { FC } from "react";

import "./icon.module.scss";

interface IUiIconProps {
  name: string;
  size?: number | undefined;
  className?: string;
}

const Icon: FC<IUiIconProps> = ({ name, size = 24, className = "" }) => {
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

export default Icon;
