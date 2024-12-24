import UiButton from "@/components/UI/UiButton";

interface NavigationProps {
  nextStep: () => void;
  previousStep: () => void;
  disabledPrevious: boolean;
  disabledNext: boolean;
}

const ScanNavigation = (props: NavigationProps) => {
  const { nextStep, previousStep, disabledPrevious, disabledNext } = props;

  return (
    <>
      <UiButton
        text={"Back"}
        onClick={previousStep}
        className="ml-025 mr-025"
        disabled={disabledPrevious}
      />
      <UiButton
        text={"Next"}
        onClick={nextStep}
        className="ml-025 mr-025"
        disabled={disabledNext}
      />
    </>
  );
};

export default ScanNavigation;
