import { useEffect } from "react";

export interface IWizardStepsHeaderProps {
  steps: Array<string>;
  currentStep: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const WizardStepsHeader = ({
  steps,
  currentStep,
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
                ? "border-accentColor border-2 bg-lime-100"
                : "bg-lime-50",
              "rounded-xl px-4 py-1"
            )}
          >
            <span className="whitespace-nowrap">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="h-0 w-[20px] border-b"></div>
          )}
        </div>
      ))}
    </div>
  );
};
