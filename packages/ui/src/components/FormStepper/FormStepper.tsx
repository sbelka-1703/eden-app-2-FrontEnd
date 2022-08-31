import "./styles.css";

import React from "react";

export interface FormStepperProps {
  step: number;
  maxSteps: number;
}

export const FormStepper: React.FC<FormStepperProps> = ({ step, maxSteps }) => {
  const stepArray = [];

  for (let i = 1; i < maxSteps + 1; i++) {
    if (i <= step) {
      stepArray.push(true);
    } else {
      stepArray.push(false);
    }
  }
  return (
    <div className="flex w-full">
      {stepArray?.map((item, index: number) => (
        <div key={index} className="flex w-full flex-col">
          <div className="flex h-2 w-full flex-row rounded-md">
            <div
              className={`${
                item ? "data-container" : "data-container-active"
              } flex w-full items-center justify-center`}
            >
              <h3
                className={`text-xs font-normal uppercase tracking-wide ${
                  item ? "text-black" : "text-transparent"
                }`}
              >
                {`STEP ${index + 1}`}
              </h3>
            </div>
            <div
              className={`${item ? "front-arrow" : "front-arrow-active"}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
