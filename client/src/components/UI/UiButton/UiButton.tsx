import {FC} from 'react';
import {observer} from "mobx-react-lite";
import './UiButton.Styles.scss';

import styles from "./button.module.scss";

interface IUiButtonProps {
  text: string;
  width?: number | undefined;
  height?: number | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}

const UiButton = ({
  text,
  onClick,
  width = 150,
  height = 45,
  disabled = false,
  className = "",
}: IUiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles.btn__action} ${className}`}
      style={{ width, height }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default UiButton;
