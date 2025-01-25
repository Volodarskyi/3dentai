import { FC } from "react";

import { UiButton } from "@/UI/UiButton/UiButton";

import styles from "./styles.module.scss";

interface IScanNavigationProps {
  nextStep: () => void;
  previousStep: () => void;
  disabledPrevious: boolean;
  disabledNext: boolean;
}

const ScanNavigation: FC<IScanNavigationProps> = (props) => {
  const { nextStep, previousStep, disabledPrevious, disabledNext } = props;

  return (
    <div className={styles.container}>
      <UiButton
        disabled={disabledPrevious}
        onClick={previousStep}
        text={"Previous"}
      />
      <UiButton disabled={disabledNext} onClick={nextStep} text={"Next"} />
    </div>
  );
};

export default ScanNavigation;
