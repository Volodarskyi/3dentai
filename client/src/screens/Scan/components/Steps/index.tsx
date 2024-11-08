import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

import ModelStep from "./ModelStep";
import ResponseStep from "./ResponseStep";
import { UploadStep } from "./UploadStep";

const Steps = () => {
  const { scanStore } = useStores();
  const { step } = scanStore;

  return (
    <div
      className={
        "flex items-start justify-center bg-white mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl"
      }
    >
      {step === 1 && <UploadStep />}
      {step === 2 && <ResponseStep />}
      {step === 3 && <ModelStep />}
    </div>
  );
};

export default observer(Steps);
