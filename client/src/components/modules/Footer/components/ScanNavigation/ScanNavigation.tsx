import { FC } from "react";
import { observer } from "mobx-react-lite";

import Button from "@/components/UI/UiButton/UiButton";
import { useStores } from "@/hooks/useStores";

import "./scanNavigation.styles.scss";

const ScanNavigation: FC = () => {
  const { scanStore } = useStores();
  const { nextStep, previousStep, disabledPrevious, disabledNext } = scanStore;

  return (
    <div className={"scanNavigation"}>
      <Button
        disabled={disabledPrevious}
        onClick={previousStep}
        text={"Previous"}
      />
      <Button disabled={disabledNext} onClick={nextStep} text={"Next"} />
    </div>
  );
};

export default observer(ScanNavigation);
