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
    if(totalDays !=0 && currentDayCount!= 0)
    {
      const reminderProgress = (currentDayCount/totalDays) * 100;
      setProgressBarWidthFraction(reminderProgress)
    }
  },[totalDays, currentDayCount])
  return (
      <div className="w-full bg-gray-200 h-1 mb-6">
        <div style={{ width: `${progressBarWidthFraction}%` }} className={`bg-soilYellow h-1`}></div>
      </div>
    
  );
};

export default ProgressBar;
