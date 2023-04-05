import { Button } from "@eden/package-ui";
import { useState } from "react";

import { IWizardStepProps } from "../WizardStep";
import { WizardStepsHeader } from "../WizardStepsHeader";

export interface IWizardProps {
  children: Array<React.ReactElement<IWizardStepProps>>;
  showStepsHeader?: boolean;
}

export const Wizard = ({ children, showStepsHeader = false }: IWizardProps) => {
  const [step, setStep] = useState<number>(0);

  // console.log(children);

  const isPrevDisabled = () => {
    let _disabled = false;

    if (step <= 0) _disabled = true;

    return _disabled;
  };

  const handlePrevClick = () => {
    if (!isPrevDisabled()) setStep(step - 1);
  };
  const isNextDisabled = () => {
    let _disabled = false;

    if (step >= children.length - 1) _disabled = true;

    return _disabled;
  };

  const handleNextClick = () => {
    if (!isNextDisabled()) setStep(step + 1);
  };

  return (
    <div className="">
      {showStepsHeader && (
        <WizardStepsHeader
          currentStep={step}
          steps={children.map((_step) => _step.props.label)}
        />
      )}
      <div className="w-full">{children}</div>
      <div className="absolute bottom-0 left-0 flex w-full p-4">
        {!isPrevDisabled() && (
          <Button
            className="mr-auto"
            variant="secondary"
            onClick={handlePrevClick}
            disabled={isPrevDisabled()}
          >
            Previous
          </Button>
        )}
        {!isNextDisabled() && (
          <Button
            className="ml-auto"
            variant="secondary"
            onClick={handleNextClick}
            disabled={isNextDisabled()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
