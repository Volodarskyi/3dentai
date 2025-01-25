import React, { FC } from "react";
import { observer } from "mobx-react-lite";

import './UiIntputModal.Styles.scss';
import {UiIcon} from "@/components/UI/UiIcon/UiIcon";

import "./UiIntputModal.Styles.scss";

interface IUiInputModalProps {
    type?: string;
    icon: string; // Icon name for UiIcon
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    size?: number; // Icon size
    className?: string; // Custom class for additional styling
}

const UiInputModalComponent: FC<IUiInputModalProps> = ({
  type = "text",
  icon,
  placeholder = "",
  value,
  onChange,
  size = 24,
  className = "",
}) => {
  return (
    <div className={`ui-input-modal ${className}`}>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <UiIcon name={icon} size={size} className="input-icon" />
    </div>
  );
};
export default UiInputModalComponent;
