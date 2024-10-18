"use client";

import Processor from "./components/Progress";
import Navigation from "./components/Navigation";
import Steps from "@/app/scan/components/Steps";
import { useEffect, useMemo, useState } from "react";

const Scan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [navigationSetting, setNavigationSetting] = useState({
    disabledPrevious: true,
    disabledNext: false,
  });

  const handlerStep = useMemo(
    () => (newStep: number) => () => setActiveStep(newStep),
    [],
  );

  useEffect(() => {
    setNavigationSetting({
      disabledPrevious: activeStep <= 0,
      disabledNext: activeStep >= 4,
    });
  }, [activeStep]);

  return (
    <div className="bg-white min-h-svh flex items-center flex-col pt-12">
      <Processor activeStep={activeStep} handlerStep={handlerStep} />
      <Steps step={activeStep} />
      <Navigation
        activeStep={activeStep}
        handlerStep={handlerStep}
        navigationSetting={navigationSetting}
      />
    </div>
  );
};

export default Scan;
