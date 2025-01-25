"use client";

import { useEffect } from "react";
import { Row, Steps, theme } from "antd";
import { observer } from "mobx-react-lite";

import GlobalLoading from "@/components/GlobalLoading";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import {
  AnalyzePhoto,
  Display3DModal,
  UploadPhoto,
} from "@/components/scanSteps";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

const ScanScreen = () => {
  const { scanStore } = useStores();
  const { token } = theme.useToken();
  const {
    setSteps,
    steps,
    step,
    nextStep,
    previousStep,
    isLoading,
    disabledPrevious,
    disabledNext,
  } = scanStore;

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

  return (
    <Row style={{ width: "100%" }}>
      {isLoading && <GlobalLoading />}
      {steps.length ? (
        <>
          <Steps current={step} items={steps} />
          <div
            style={{
              width: "100%",
              minHeight: "260px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              color: token.colorTextTertiary,
              backgroundColor: token.colorFillAlter,
              borderRadius: token.borderRadiusLG,
              border: `1px dashed ${token.colorBorder}`,
              marginTop: 16,
            }}
          >
            {steps[step].content}
          </div>
          <Navigation
            disabledPrevious={disabledPrevious}
            disabledNext={disabledNext}
            previousStep={previousStep}
            nextStep={nextStep}
          />
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
