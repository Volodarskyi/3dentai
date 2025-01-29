import { FC } from "react";
import { observer } from "mobx-react-lite";

import "./UiButton.Styles.scss";

interface IUiButtonProps {
  text: string;
  onClick: () => void;
  width?: number | undefined;
  height?: number | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}

const Button: FC<IUiButtonProps> = ({
  text,
  onClick,
  width = 150,
  height = 45,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`ui-btn ui-btn__action ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default observer(Button);
