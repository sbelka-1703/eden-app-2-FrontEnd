import "./styles.css";

import { useEffect, useState } from "react";

export interface IBatteryStepperProps {
  batteryPercentage: number;
}

export const BatteryStepper = ({ batteryPercentage }: IBatteryStepperProps) => {
  const [batteryColor, setBatteryColor] = useState("#ff0000");

  useEffect(() => {
    if (batteryPercentage <= 20) {
      setBatteryColor("#ff0000");
    } else if (20 < batteryPercentage && batteryPercentage <= 40) {
      setBatteryColor("#ff9100");
    } else if (40 < batteryPercentage && batteryPercentage <= 60) {
      setBatteryColor("#fff200");
    } else if (60 < batteryPercentage && batteryPercentage <= 80) {
      setBatteryColor("#d7fc03");
    } else if (80 < batteryPercentage && batteryPercentage <= 100) {
      setBatteryColor("#00ff00");
    }
  }, [batteryPercentage]);

  return (
    <div className="battery">
      <div className="battery-head"></div>
      <div className="battery-body">
        <div
          className="charge"
          style={{
            height: `${batteryPercentage}%`,
            background: `${batteryColor}`,
          }}
        ></div>
      </div>
    </div>
  );
};
