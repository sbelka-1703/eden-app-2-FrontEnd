import { ProgressStep } from "../ProgressStepper";

export interface GreenStepperProps {
  steps: ProgressStep[];
}

export const GreenStepper = ({ steps }: GreenStepperProps) => (
  <div className="flex">
    {steps.map((step) => (
      <div
        key={step.name}
        className={`
          relative
          h-1
         ${step.completed ? "bg-green-300" : "bg-gray-100"}
          after:absolute
          after:top-2/4
          after:right-0
          after:h-3.5
          after:w-3.5
          after:-translate-y-2/4
          after:rounded-full
          after:bg-inherit`}
        style={{ width: 100 / steps.length + "%" }}
      />
    ))}
  </div>
);
