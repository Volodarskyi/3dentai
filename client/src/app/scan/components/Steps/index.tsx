import UploadStep from "@/app/scan/components/Steps/UploadStep";

interface StepsProps {
  step: number;
}

const Steps = (props: StepsProps) => {
  const { step } = props;

  return (
    <div
      className={
        "flex items-start justify-center bg-white mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl"
      }
    >
      {step === 0 && <UploadStep />}
    </div>
  );
};

export default Steps;
