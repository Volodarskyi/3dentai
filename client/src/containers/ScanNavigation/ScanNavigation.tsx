import { FC } from "react";
import { observer } from "mobx-react-lite";

import Button from "@/components/Button";
import { useStores } from "@/hooks/useStores";

import styles from "./scanNavigation.module.scss";

const ScanNavigation: FC = () => {
  const { scanStore } = useStores();
  const { nextStep, previousStep, disabledPrevious, disabledNext } = scanStore;

  return (
    <div className={styles.container}>
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
