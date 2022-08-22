import { useState } from "react";

export interface TabsCardProps {
  tabs: string[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (val: number) => void;
}

export const TabsCard = ({ tabs, onSelect }: TabsCardProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const maxIndex = tabs.length - 1;

  const handleTabClick = (index: number, sideCorner = "") => {
    if (sideCorner === "right" && index < tabs.length - 1) {
      setCurrentTab(index + 1);
      onSelect(index);
    } else if (sideCorner === "left" && currentTab > 0) {
      setCurrentTab(index - 1);
      onSelect(index);
    } else {
      // console.log(index);
      setCurrentTab(index);
      onSelect(index);
    }
  };

  const calculateTabZindex = (index: number) => {
    if (currentTab == index) {
      return 50;
    } else if (currentTab > index) {
      return 30 + index;
    } else {
      return 40 - index;
    }
  };

  const calculateActiveTab = (index: number) => {
    if (currentTab == index) {
      return "border-accentColor border-t-2 border-l-2 border-r-2";
    } else {
      return "border-accentColor border-b-2";
    }
  };

  const calculateActiveTabBorderColor = (index: number) => {
    if (currentTab == index) {
      // return "#74FA6D";
      return "stroke-accentColor";
    } else {
      return "stroke-slate-200";
    }
  };

  const calculateActiveTabBorderWidth = (index: number) => {
    if (currentTab == index) {
      return "2px";
    } else {
      return "1px";
    }
  };

  return (
    <div className="flex w-full">
      {tabs &&
        tabs.map((tab, index) => (
          <div
            style={{ zIndex: calculateTabZindex(index) }}
            className={`relative h-10 w-full cursor-pointer rounded-t-xl text-center ${
              currentTab == index ? "z-50" : " bg-slate-100"
            } ${calculateActiveTab(index)}`}
            key={index}
          >
            {index != 0 && index - 1 != currentTab && (
              <button
                className={`absolute -left-9 top-0 fill-slate-100 ${calculateActiveTabBorderColor(
                  index
                )} ${currentTab == index ? "fill-white" : ""}`}
                style={{
                  strokeDasharray: "0,0,57,100",
                  strokeWidth: calculateActiveTabBorderWidth(index),
                }}
                onClick={() => handleTabClick(index, "left")}
              >
                <svg height="38" width="40">
                  <polygon points="40,0 0,40 40,40" />
                </svg>
              </button>
            )}
            <button
              className={`relative h-full w-full rounded-t-xl border-t px-3 pt-2 text-center font-medium uppercase ${
                !index ? "border-l" : ""
              } ${
                currentTab == index
                  ? "text-darkGreen bg-white text-lg decoration-zinc-500 underline-offset-[3px]"
                  : "text-soilGray bg-slate-100"
              }
                ${currentTab > index ? "pr-9" : ""}
                ${currentTab < index ? "pl-9" : ""}
                `}
              key={index}
              onClick={() => handleTabClick(index)}
            >
              <span>{tab}</span>
            </button>
            {index != maxIndex && index != currentTab - 1 && (
              <button
                className={`absolute -right-9 top-0 fill-slate-100 ${calculateActiveTabBorderColor(
                  index
                )}  ${currentTab == index ? "fill-white" : ""}`}
                style={{
                  strokeDasharray: "0,81,100",
                  strokeWidth: calculateActiveTabBorderWidth(index),
                }}
                onClick={() => handleTabClick(index, "right")}
              >
                <svg height="38" width="40">
                  <polygon points="0,0 0,40 40,40" />
                </svg>
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
