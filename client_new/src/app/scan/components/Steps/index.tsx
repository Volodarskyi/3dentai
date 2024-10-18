import UploadStep from "@/app/scan/components/Steps/UploadStep";
import { useCallback } from "react";

interface StepsProps {
  step: number;
}

const Steps = (props: StepsProps) => {
  const { step } = props;

  const getContent = useCallback(() => {
    switch (step) {
      case 0:
        return UploadStep();
      default:
        return null;
    }
  }, [step]);

  return (
    <div
      className={
        "flex items-start justify-center bg-white mx-auto px-4 py-3 sm:px-6 lg:px-8 w-full max-w-7xl"
      }
    >
      {getContent()}
    </div>
  );
};

export default Steps;
