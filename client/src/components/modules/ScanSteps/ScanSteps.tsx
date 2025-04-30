import React, { useEffect } from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";

import { UiIcon } from "@/components/UI/UiIcon/UiIcon";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import AnalyzePhoto from "./steps/AnalyzePhoto";
import UploadPhoto from "./steps/UploadPhoto";

import "./scanStep.styles.scss";

const ScanSteps = () => {
  const { scanStore } = useStores();
  const { setSteps, steps, step } = scanStore;

  useEffect(() => {
    const initSteps: ISteps[] = [
      {
        title: "Upload photo",
        icon: <UiIcon idIcon="UploadPhoto" name="tooth" size={24} />,
        content: <UploadPhoto />,
      },
      {
        title: "Questions",
        icon: <UiIcon idIcon="SendAI" name="ai" size={24} />,
        content: <div>Questions</div>,
      },
      {
        title: "Send to AI",
        icon: <UiIcon idIcon="SendAI" name="ai" size={24} />,
        content: <AnalyzePhoto />,
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
