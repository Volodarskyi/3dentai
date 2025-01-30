import { useEffect } from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";

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
        title: "Step 1",
        description: "Upload video (photo).",
        content: <UploadPhoto />,
      },
      {
        title: "Step 2",
        description: "Send to Chat GPT API and receive response.",
        content: <AnalyzePhoto />,
      },
      {
        title: "Step 3",
        description: "Convert photo to 3D.",
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
