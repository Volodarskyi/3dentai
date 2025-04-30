import { FC } from "react";
import { observer } from "mobx-react-lite";

import Button from "@/components/UI/UiButton/UiButton";
import { useStores } from "@/hooks/useStores";

import "./scanNavigation.styles.scss";

const ScanNavigation: FC = () => {
  const { scanStore } = useStores();
  const {
    nextStep,
    previousStep,
    disabledPrevious,
    disabledNext,
    step,
    steps,
  } = scanStore;
  const isSaveStep = steps.length - 1 === step;
  const isNextDisabled = disabledNext && !isSaveStep;

  const handleNextBtn = () => {
    if (isSaveStep) {
      console.log("dave");
      return;
    }
    nextStep();
  };

  return (
    <div className={"scanNavigation"}>
      <Button
        disabled={disabledPrevious}
        onClick={previousStep}
        text={"Previous"}
      />
      <Button
        disabled={isNextDisabled}
        onClick={handleNextBtn}
        text={isSaveStep ? "Save" : "Next"}
      />
    </div>
  );
};

export default observer(ScanNavigation);
