"use client";

import { useEffect } from "react";
import { Row } from "antd";
import { observer } from "mobx-react-lite";

import Loading from "@/components/Loading";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import Navigation from "./components/Navigation";
import Processor from "./components/Progress";
import Steps from "./components/Steps";
import ModelStep from "./components/Steps/ModelStep";
import ResponseStep from "./components/Steps/ResponseStep";
import { UploadStep } from "./components/Steps/UploadStep";

const initSteps: ISteps[] = [
  {
    title: "Step 1",
    description: "Upload video (photo).",
    content: <UploadStep />,
  },
  {
    title: "Step 2",
    description: "Send to Chat GPT API and receive response.",
    content: <ResponseStep />,
  },
  {
    title: "Step 3",
    description: "Convert photo to 3D.",
    content: <ModelStep />,
  },
];

const ScanScreen = () => {
  const { scanStore } = useStores();
  const { setSteps, steps } = scanStore;

  useEffect(() => {
    setSteps(initSteps);
  }, [setSteps]);

  return (
    <Row style={{ width: "100%" }}>
      {steps.length ? (
        <>
          <Processor />
          <Steps />
          <Navigation />
        </>
      ) : (
        <div className={"min-h-56 w-full flex justify-center items-center"}>
          <Loading />
        </div>
      )}
    </Row>
  );
};

export default observer(ScanScreen);
