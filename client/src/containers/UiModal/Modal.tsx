"use client";

import React, { FC } from "react";
import { Modal as AntModal } from "antd";
import { observer } from "mobx-react-lite";

import SignInWindow from "@/containers/modal/SignInWindow";
import SignUpWindow from "@/containers/modal/SignUpWidow";
import { useStores } from "@/hooks/useStores";
import { EModalWindows } from "@/types/modal";

import "./modal.styles.scss";

// Utility function to parse the title from the enum
const getTitleFromEnum = (modalType: EModalWindows | null): string => {
  if (!modalType) return "";
  return modalType.replace(/([A-Z])/g, " $1").trim(); // Convert "ENumTitleWindow" -> "ENum Title Window"
};

const Modal: FC = () => {
  const { modalStore } = useStores();

  const renderModalContent = () => {
    switch (modalStore.currentModal) {
      case EModalWindows.SignIn:
        return <SignInWindow />;
      case EModalWindows.SignUp:
        return <SignUpWindow />;
      default:
        return null;
    }
  };

  const modalStyles = {
    header: {
      backgroundColor: "rgba(88,211,255,0.0)",
    },
    content: {
      backdropFilter: "blur(1px)",
      border: "2px solid #43D3FFFF",
      backgroundColor: "rgba(125,226,255,0.2)",
    },
    mask: {
      backdropFilter: "blur(3px)",
      backgroundColor: "rgba(0,7,28,0.85)",
    },
  };

  return (
    <AntModal
      className="ui-modal"
      title={
        <div className="ui-modal__title">
          {getTitleFromEnum(modalStore.currentModal)}
        </div>
      }
      open={modalStore.isShowUiModal}
      onCancel={modalStore.closeUiModal}
      footer={null}
      styles={modalStyles}
    >
      {renderModalContent()}
    </AntModal>
  );
};

export default observer(Modal);
