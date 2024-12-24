"use client";

import { useEffect, useRef } from "react";
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

import styles from "./scan.module.scss";

const ScanScreen = () => {
  const { scanStore } = useStores();
  const {
    setSteps,
    steps,
    step,
    nextStep,
    previousStep,
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
        id: "1",
        title: "Step 1",
        description: "Upload video (photo).",
        content: <UploadPhoto />,
      },
      {
        id: "2",
        title: "Step 2",
        description: "Send to Chat GPT API and receive response.",
        content: <AnalyzePhoto />,
      },
      {
        id: "3",
        title: "Step 3",
        description: "Convert photo to 3D.",
        content: <Display3DModal />,
      },
    ];

    setSteps(initSteps);
  }, [setSteps]);

  const getStyles = (index: number) => {
    if (step === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (step - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (step + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (step - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (step + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < step - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > step + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <div className={styles.container}>
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

      <div className={styles.slideC}>
        {steps.map((item, i) => (
          <div key={item.id} className={styles.slide} style={getStyles(i)}>
            {steps[i].content}
          </div>
        ))}
      </div>

      {/*<div className={styles.container}>*/}
      {/*  <Carousel effect="fade" ref={ref} className={styles.slider}>*/}
      {/*    <UploadPhoto />*/}
      {/*    <AnalyzePhoto />*/}
      {/*    <Display3DModal />*/}
      {/*  </Carousel>*/}
      {/*</div>*/}

      <BottomNavigation>
        <ScanNavigation
          disabledPrevious={disabledPrevious}
          disabledNext={disabledNext}
          previousStep={previousStep}
          nextStep={nextStep}
        />
      </BottomNavigation>
    </div>
  );
};

export default observer(ScanScreen);
