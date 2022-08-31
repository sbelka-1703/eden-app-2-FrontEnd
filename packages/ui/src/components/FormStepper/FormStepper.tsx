import "./styles.css";

import React from "react";
type FormStepper = {
  name: string;
  completed: boolean;
};
export interface FormStepperProps {
  steps?: FormStepper[];
  step: number;
  maxSteps: number;
}

export const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  step,
  maxSteps,
}) => {
  console.log("step", step);
  console.log("maxSteps", maxSteps);

  return (
    <div className="flex w-full rounded-lg border-amber-600	">
      {steps?.map((step: FormStepper, index: number) => (
        <div key={index} className="flex w-24 flex-col">
          <div className="flex h-2 w-full flex-row rounded-md">
            <div
              className={`${
                step?.completed ? "data-container" : "data-container-active"
              } flex items-center justify-center`}
            >
              <h3
                className={`text-xs font-normal uppercase tracking-wide ${
                  step?.completed ? "text-black" : "text-transparent"
                }`}
              >
                {`STEP ${step?.name}`}
              </h3>
            </div>
            <div
              className={`${
                step?.completed ? "front-arrow" : "front-arrow-active"
              }`}
            ></div>
          </div>
        </div>
      ))}
      {/* {steps?.map((step: FormStepper, index: number) => (
        <div key={index} className="flex w-24 flex-col">
          <div className="flex h-2 w-full flex-row rounded-md">
            <div
              className={`${
                step?.completed ? "data-container" : "data-container-active"
              } flex items-center justify-center`}
            >
              <h3
                className={`text-xs font-normal uppercase tracking-wide ${
                  step?.completed ? "text-black" : "text-transparent"
                }`}
              >
                {`STEP ${step?.name}`}
              </h3>
            </div>
            <div
              className={`${
                step?.completed ? "front-arrow" : "front-arrow-active"
              }`}
            ></div>
          </div>
        </div>
      ))} */}
    </div>
  );
};
