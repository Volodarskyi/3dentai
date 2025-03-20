import { FC } from "react";
import { observer } from "mobx-react-lite";

import "./UiIcon.Styles.scss";

interface IUiIconProps {
  idIcon?: string;
  name: string;
  size?: number | undefined;
  className?: string;
  isActive?: boolean;
}

const UiIconComponent: FC<IUiIconProps> = ({
  idIcon = "",
  name,
  size = 24,
  className = "",
  isActive = false,
}) => {
  const src = isActive
    ? `/assets/icons/${name}-active.png`
    : `/assets/icons/${name}.png`;

  return (
    <img
      id={idIcon}
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`ui-icon ${className}`}
    />
  );
};

export const UiIcon = observer(UiIconComponent);
