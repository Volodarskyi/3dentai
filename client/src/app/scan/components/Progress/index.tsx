import { CheckIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";

import { classNames } from "@/helper/classnames";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

const Progress = observer(() => {
  const { scanStore } = useStores();
  const { step: activeStep, steps } = scanStore;

  const renderStep = (step: ISteps, stepIdx: number) => {
    const isCompleted = stepIdx < activeStep;
    const isActive = stepIdx + 1 === activeStep;

    return (
      <li
        key={stepIdx}
        className="relative overflow-hidden lg:flex-1 lg:border-b lg:border-t lg:border-gray-200"
      >
        <div
          className={classNames(
            stepIdx === 0 ? "rounded-t-md" : "",
            stepIdx === steps.length ? "rounded-b-md" : "",
            "overflow-hidden border border-gray-200 lg:border-0",
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              "absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
              isActive || isCompleted ? "bg-indigo-600" : "bg-transparent",
            )}
          />
          <span
            className={classNames(
              stepIdx !== 0 ? "lg:pl-9" : "",
              "flex items-start px-6 py-5 text-sm font-medium",
            )}
          >
            <span className="flex-shrink-0">
              {isCompleted ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </div>
              ) : (
                <div
                  className={classNames(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isActive ? "border-indigo-600" : "border-gray-300",
                  )}
                >
                  <span
                    className={isActive ? "text-indigo-600" : "text-gray-500"}
                  >
                    {stepIdx + 1}
                  </span>
                </div>
              )}
            </span>
            <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
              <span
                className={classNames(
                  "text-sm font-medium",
                  isCompleted || isActive ? "text-indigo-600" : "text-gray-500",
                )}
              >
                {step.name}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {step.description}
              </span>
            </span>
          </span>
        </div>
        {stepIdx !== 0 && (
          <div
            aria-hidden="true"
            className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
          >
            <svg
              fill="none"
              viewBox="0 0 12 82"
              preserveAspectRatio="none"
              className="h-full w-full text-gray-300"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        )}
      </li>
    );
  };

  return (
    <nav
      aria-label="Progress"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
    >
      <ol
        role="list"
        className="overflow-y-scroll rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
      >
        {steps.map((step, stepIdx) => renderStep(step, stepIdx))}
      </ol>
    </nav>
  );
});

export default Progress;
