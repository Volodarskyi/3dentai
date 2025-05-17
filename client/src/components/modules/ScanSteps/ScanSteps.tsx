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
import {ScanStepComplete} from "@/components/modules/ScanSteps/steps/ScanStepComplete/ScanStepComplete";

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
        title: "Questions",
        // description: "Send to AI and receive response.",
        icon: <UiIcon idIcon="Questions" name="questions" size={24} />,
        content: <div>Questions</div>,
      },
      {
        title: "AI Analyze",
        // description: "Send to AI and receive response.",
        icon: <UiIcon idIcon="SendAI" name="ai" size={24} />,
        content: <AnalyzePhoto />,
      },
      {
        title: "Complete",
        // description: "Send to AI and receive response.",
        icon: <UiIcon idIcon="Approval" name="approval" size={24} />,
        content: <ScanStepComplete/>,
      },
      // {
      //   title: "Convert to 3D",
      //   // description: "Convert photo to 3D.",
      //   icon: <UiIcon idIcon="Convert3D" name="tooth-3d" size={24} />,
      //   content: <Display3DModal />,
      // },
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
