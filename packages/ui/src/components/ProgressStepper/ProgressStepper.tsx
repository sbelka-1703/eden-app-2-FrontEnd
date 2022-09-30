export type ProgressStep = {
  name: string;
  completed: boolean;
};
export interface ProgressStepperProps {
  steps: ProgressStep[];
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps }) => {
  return (
    <div className="flex w-full">
      {steps?.map((step: ProgressStep, index: number) => (
        <div
          key={index}
          className="mx-1 flex w-60 flex-col items-start justify-start"
        >
          <h3 className="text-xs font-bold uppercase text-black">
            {step?.name}
          </h3>
          <div
            className={`w-full ${
              step?.completed ? "bg-soilGreen-900" : "bg-gray-400"
            } h-2 rounded-md`}
          />
        </div>
      ))}
    </div>
  );
};
