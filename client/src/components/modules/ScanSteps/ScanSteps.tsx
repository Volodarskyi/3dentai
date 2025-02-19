import React, { useEffect } from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";

import { UiIcon } from "@/components/UI/UiIcon/UiIcon";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import AnalyzePhoto from "./steps/AnalyzePhoto";
import Display3DModal from "./steps/Display3DModal";
import UploadPhoto from "./steps/UploadPhoto";

import "./scanStep.styles.scss";

const ScanSteps = () => {
  const { scanStore } = useStores();
  const { setSteps, steps, step } = scanStore;

  useEffect(() => {
    const initSteps: ISteps[] = [
      {
        title: "Upload photo",
        // description: "Upload video (photo).",
        icon: <UiIcon idIcon="UploadPhoto" name="tooth" size={24} />,
        content: <UploadPhoto />,
      },
      {
        title: "Send to AI",
        // description: "Send to AI and receive response.",
        icon: <UiIcon idIcon="SendAI" name="ai" size={24} />,
        content: <AnalyzePhoto />,
      },
      {
        title: "Convert to 3D",
        // description: "Convert photo to 3D.",
        icon: <UiIcon idIcon="Convert3D" name="tooth-3d" size={24} />,
        content: <Display3DModal />,
      },
    ];

    setSteps(initSteps);
  }, [setSteps]);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={"scanStep__container"}>
      <Steps current={step} items={steps} />
      <div className={"scanStep__wrapper"}>{steps[step].content}</div>
    </div>
  );
};

export default observer(ScanSteps);
