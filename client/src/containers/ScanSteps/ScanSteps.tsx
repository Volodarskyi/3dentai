import { useEffect } from "react";
import { Steps } from "antd";

import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import { AnalyzePhoto, Display3DModal, UploadPhoto } from "./steps";

import styles from "./scanSteps.module.scss";

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

  return steps.length ? (
    <>
      <div className={styles.container}>
        <Steps current={step} items={steps} />
        <div className={styles.wrapper}>{steps[step].content}</div>
      </div>
    </>
  ) : null;
};

export default ScanSteps;
