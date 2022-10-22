import "./styles.css";

export interface IBatteryStepperProps {
  currentStep: number;
}

export const BatteryStepper = ({ currentStep }: IBatteryStepperProps) => {
  const stepBattery = (step: number) => {
    switch (step) {
      case 0:
        return <div className="charge0"></div>;
      case 1:
        return <div className="charge1"></div>;
      case 2:
        return <div className="charge2"></div>;
      case 3:
        return <div className="charge3"></div>;
      case 4:
        return <div className="charge4"></div>;
      default:
        return <div className="charge0"></div>;
    }
  };

  return (
    <div className="battery">
      <div className="battery-head"></div>
      <div className="battery-body">{stepBattery(currentStep)}</div>
    </div>
  );
};
