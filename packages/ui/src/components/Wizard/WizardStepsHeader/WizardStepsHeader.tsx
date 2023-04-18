import { Dispatch, SetStateAction, useEffect } from "react";

export interface IWizardStepsHeaderProps {
  steps: Array<string>;
  currentStep: number;
  setStep: Dispatch<SetStateAction<number>>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const WizardStepsHeader = ({
  steps,
  currentStep,
  setStep,
}: IWizardStepsHeaderProps) => {
  useEffect(() => {
    const activeStep = document.querySelector(`#wizard-header-${currentStep}`);

    if (activeStep) {
      activeStep.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [currentStep]);

  return (
    <div className="scrollbar-hide absolute left-0 top-0 z-30 flex w-full overflow-x-scroll p-4">
      {steps.map((step, index) => (
        <div
          id={`wizard-header-${index}`}
          key={index}
          className="flex items-center"
        >
          <div
            className={classNames(
              currentStep === index
                ? " bg-[#DEFEFF]"
                : "cursor-pointer bg-[#70B2B4] text-slate-600",
              "rounded-xl px-4 py-1"
            )}
            onClick={() => {
              if (currentStep != index) setStep(index);
            }}
          >
            <span className="whitespace-nowrap">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="h-0 w-[15px] border-b-2 border-slate-500"></div>
          )}
        </div>
      ))}
    </div>
  );
};
