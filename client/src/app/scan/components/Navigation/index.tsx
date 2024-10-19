interface NavigationProps {
  activeStep: number;
  handlerStep: (step: number) => () => void;
  navigationSetting: {
    disabledPrevious: boolean;
    disabledNext: boolean;
  };
}

const Navigation = (props: NavigationProps) => {
  const { activeStep, navigationSetting, handlerStep } = props;
  const { disabledPrevious, disabledNext } = navigationSetting;

  const disabledStyle = "disabled:opacity-50 disabled:pointer-events-none";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-end bg-white mx-auto px-4 py-3 sm:px-6 lg:px-8 w-full max-w-7xl"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={disabledPrevious}
          onClick={navigationSetting ? handlerStep(activeStep - 1) : undefined}
          className={`w-1/2 md:w-auto justify-center relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${disabledStyle}`}
        >
          Previous
        </button>
        <button
          disabled={disabledNext}
          onClick={navigationSetting ? handlerStep(activeStep + 1) : undefined}
          className={`w-1/2 md:w-auto justify-center relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${disabledStyle}`}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
