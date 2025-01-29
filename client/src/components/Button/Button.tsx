import { FC } from "react";

import styles from "./button.module.scss";

interface IButtonProps {
  text: string;
  onClick: () => void;
  width?: number | undefined;
  height?: number | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}

const Button: FC<IButtonProps> = ({
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
      className={`${styles.btn ? styles.btn : ""} ${styles.bntActive} ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
