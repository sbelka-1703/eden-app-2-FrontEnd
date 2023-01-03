import { useState } from "react";

export interface IWorkingHoursProps {
  title?: string;
  minHour?: string;
  maxHour?: string;
  age?: string;
  onHourChange?: (desc: string) => void;
  onQualitiesAdd?: (desc: string) => void;
}

export const WorkingHours = ({
  title = "",
  minHour = "0",
  maxHour = "0",
  age = "20",
  onHourChange,
  onQualitiesAdd,
}: IWorkingHoursProps) => {
  const [miniHour, setMiniHour] = useState(minHour);
  const [maxiHour, setMaxiHour] = useState(maxHour);
  const [ageStarted, setAgeStarted] = useState(age);

  const handleHourChange = (title: string, hour: string) => {
    onHourChange && onHourChange(title + hour);
  };

  const handleQualitiesAdded = (title: string, val: any) => {
    onQualitiesAdd && onQualitiesAdd(title + val);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex items-center justify-between gap-x-5">
        <div className="flex flex-col items-center justify-center text-center">
          <div className=" text-sm text-gray-400">min hrs/week</div>
          <input
            type="text"
            className="w-20 rounded-2xl border-2 border-gray-400 px-3 py-1 text-center text-lg font-semibold"
            value={miniHour}
            onChange={(e) => {
              setMiniHour(e.target.value);
              handleHourChange("Min hour =", e.target.value);
            }}
          />
        </div>
        <div className="mt-4 w-4 border-2 border-gray-400"></div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className=" text-sm text-gray-400">max hrs/week</div>
          <input
            type="text"
            className="w-20 rounded-2xl border-2 border-gray-400 px-3 py-1 text-center text-lg font-semibold"
            value={maxiHour}
            onChange={(e) => {
              setMaxiHour(e.target.value);
              handleHourChange("Max hour = ", e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mt-4 text-start">
        <div className="text-xl font-semibold">Your Qualities </div>
        <ul className=" list-disc  justify-center px-3 py-2">
          <li>
            <span className="px-2"> Good In Maths</span>
            <input
              type="checkbox"
              onChange={(e) => {
                handleQualitiesAdded("Maths Skills =", e.target.checked);
              }}
            />
          </li>
          <li>
            <span className="px-2"> Good in teams </span>
            <input
              type="checkbox"
              onChange={(e) => {
                handleQualitiesAdded("Team Spirit =", e.target.value);
              }}
            />
          </li>
          <li>
            <span className="px-2">
              {" "}
              Age you started programming ({ageStarted} years){" "}
            </span>
            <input
              type="range"
              min="5"
              max="50"
              value={ageStarted}
              onChange={(e) => {
                setAgeStarted(e.target.value);
                handleQualitiesAdded("Age =", e.target.value);
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
