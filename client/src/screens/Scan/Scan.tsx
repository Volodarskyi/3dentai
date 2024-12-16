"use client";

import { useEffect, useRef } from "react";
import { Carousel, theme } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { observer } from "mobx-react-lite";

import BottomNavigation from "@/components/BottomNavigation";
import ScanNavigation from "@/components/ScanNavigation";
import {
  AnalyzePhoto,
  Display3DModal,
  UploadPhoto,
} from "@/components/scanSteps";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import styles from "./styles.module.scss";

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

  const ref = useRef<CarouselRef>(null);

  useEffect(() => {
    if (ref.current) {
      console.log("step", step);
      ref.current?.goTo(step);
    }
  }, [step]);

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
    <>
      {/*<Row style={{ width: "100%" }}>*/}
      {/*<Steps current={step} items={steps} />*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    width: "100%",*/}
      {/*    minHeight: "260px",*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "center",*/}
      {/*    textAlign: "center",*/}
      {/*    color: token.colorTextTertiary,*/}
      {/*    backgroundColor: token.colorFillAlter,*/}
      {/*    borderRadius: token.borderRadiusLG,*/}
      {/*    border: `1px dashed ${token.colorBorder}`,*/}
      {/*    marginTop: 16,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {steps[step]?.content}*/}
      {/*</div>*/}
      {/*</Row>*/}

      <div className={styles.container}>
        <Carousel effect="fade" ref={ref} className={styles.slider}>
          <UploadPhoto />
          <AnalyzePhoto />
          <Display3DModal />
        </Carousel>
      </div>

      <BottomNavigation>
        <ScanNavigation
          disabledPrevious={disabledPrevious}
          disabledNext={disabledNext}
          previousStep={previousStep}
          nextStep={nextStep}
        />
      </BottomNavigation>
    </>
  );
};

export default observer(ScanScreen);
