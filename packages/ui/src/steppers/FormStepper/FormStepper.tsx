export interface IFormStepperProps {
  numberofSteps: number;
  currentStep: number;
}

type StepProps = {
  i: number;
  isActive: boolean;
};

const Steps = ({ i, isActive }: StepProps) => {
  return (
    <div
      style={{
        clipPath:
          "polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%)",
      }}
      className={`font-Inter flex  h-[32px] w-full items-center justify-center font-normal md:-ml-2 lg:-ml-5 2xl:-ml-6 ${
        isActive ? "bg-[#FFF268]" : "bg-[#FFF268] opacity-40"
      }`}
    >
      <p>{isActive && `STEP ${i}`}</p>
    </div>
  );
};

export const FormStepper = ({
  numberofSteps = 6,
  currentStep,
}: IFormStepperProps) => {
  return (
    <div className="flex w-full">
      <div
        style={{
          clipPath: "polygon(85% 0, 100% 50%, 85% 100%, 0% 100%, 0 50%, 0% 0%)",
        }}
        className={`font-Inter flex h-[32px] w-full items-center justify-center rounded-l-full font-normal ${
          currentStep >= 1 ? "bg-[#FFF268]" : "bg-[#FFF268] opacity-40"
        } `}
      >
        <p>STEP 1</p>
      </div>
      {Array.from(Array(numberofSteps - 2)).map((_, i) => (
        <Steps key={i} i={i + 2} isActive={currentStep >= i + 2} />
      ))}
      <div
        style={{
          clipPath:
            "polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)",
        }}
        className={`font-Inter flex h-[32px] w-full items-center justify-center rounded-r-full font-normal md:-ml-2 lg:-ml-5 2xl:-ml-5 ${
          currentStep === numberofSteps
            ? "bg-[#FFF268]"
            : "bg-[#FFF268] opacity-40"
        } `}
      >
        <p>{currentStep === numberofSteps && `STEP ${numberofSteps}`}</p>
      </div>
    </div>
  );
};
