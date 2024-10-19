import { observer } from "mobx-react-lite";

import UploadStep from "@/app/scan/components/Steps/UploadStep";
import { useStores } from "@/hooks/useStores";

const Steps = observer(() => {
  const { scanStore } = useStores();
  const { step } = scanStore;

  return (
    <div
      className={
        "flex items-start justify-center bg-white mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl"
      }
    >
      {step === 1 && <UploadStep />}
    </div>
  );
});

export default Steps;
