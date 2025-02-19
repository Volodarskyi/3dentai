import { FC } from "react";
import { observer } from "mobx-react-lite";

import "./UiIcon.Styles.scss";

interface IUiIconProps {
  idIcon?: string;
  name: string;
  size?: number | undefined;
  className?: string;
}

const UiIconComponent: FC<IUiIconProps> = ({
  idIcon = "",
  name,
  size = 24,
  className = "",
}) => {
  const src = `/assets/icons/${name}.png`;

  return (
    <img
      id={idIcon}
      src={src}
      alt={`icon-${name}`}
      width={size}
      height={size}
      className={`ui-icon ${className}`}
    />
  );
};

export const UiIcon = observer(UiIconComponent);
