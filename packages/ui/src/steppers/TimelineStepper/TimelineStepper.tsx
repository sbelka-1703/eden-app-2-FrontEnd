import { TextLabel } from "@eden/package-ui";
interface Step {
  date: string;
  completed: boolean;
  description: string;
}

export interface TimelineStepperProps {
  steps: Step[];
}

export const TimelineStepper = ({ steps }: TimelineStepperProps) => {
  const completedStepIdx = steps.findIndex((item) => item.completed);

  return (
    <div className="flex">
      {steps.map((step, index) => (
        <div
          className="relative flex h-32 items-center"
          key={step.description}
          style={{ width: 100 / steps.length + "%" }}
        >
          <div
            className={`
         relative
         flex
         h-1
         w-full
         items-center
        ${index <= completedStepIdx ? "bg-green-300" : "bg-gray-200"}`}
          />
          <div
            style={{ borderRadius: "50%" }}
            className={`absolute top-2/4 -right-4 z-50 flex h-24 w-32 -translate-y-2/4 items-center justify-center rounded-full border-4 p-2 ${
              completedStepIdx === index
                ? "border-green-300 bg-green-100"
                : "border-gray-200 bg-gray-100"
            } text-center font-medium`}
          >
            <TextLabel className="absolute -top-6">{step.date}</TextLabel>

            <span className="text-xs">{step.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
