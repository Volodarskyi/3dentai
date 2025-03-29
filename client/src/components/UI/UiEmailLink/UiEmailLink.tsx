"use client";
import { FC, MouseEvent } from "react";

import "./UiEmailLink.Styles.scss";

interface UiEmailLinkProps {
  email: string;
  copyToClipboard?: boolean; // по умолчанию false
}

export const UiEmailLink: FC<UiEmailLinkProps> = ({
  email,
  copyToClipboard = false,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;

    if (copyToClipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      title={`Send an email to ${email}`}
      className="email-link"
    >
      {email}
    </a>
  );
};
