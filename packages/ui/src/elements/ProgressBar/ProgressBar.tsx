import { useEffect, useState } from "react";

export type ProgressBarProps = {
  totalDays?: number;
  currentDayCount?: number;
};

export const ProgressBar = ({
  totalDays= 100,
  currentDayCount=50,
}: ProgressBarProps) => {
  const [progressBarWidthFraction, setProgressBarWidthFraction] = useState(0);
  useEffect(()=>{
    
    const progressBarWidth = currentDayCount/totalDays;
    setProgressBarWidthFraction(10)
  },[totalDays, currentDayCount])
  
  return (
    <div className="w-full bg-gray-200 h-1 mb-6">
      <div className={`bg-soilYellow h-1 w-[${progressBarWidthFraction}]`}></div>
    </div>
  );
};

export default ProgressBar;
