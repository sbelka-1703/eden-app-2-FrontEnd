import { NumberCircle } from "@eden/package-ui";
import { useState } from "react";

export interface TabsSelectorProps {
  tabs: string[];
  tabNumber?: number[];
  selectedTab?: number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (val: number) => void;
}

export const TabsSelector = ({
  tabs,
  tabNumber,
  onSelect,
  selectedTab = 0,
}: TabsSelectorProps) => {
  const [currentTab, setCurrentTab] = useState(selectedTab);
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
      return 9;
    } else if (currentTab > index) {
      return 1 + index;
    } else {
      return 5 - index;
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
    <div className="flex">
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
              className={`relative h-full w-full rounded-t-xl border-t px-3 pt-0 text-center text-sm font-medium uppercase md:text-lg ${
                !index ? "border-l" : ""
              } ${
                currentTab == index
                  ? "text-darkGreen border-t-0 border-l-0 border-r-0 bg-white text-sm decoration-zinc-500 underline-offset-[3px] md:text-lg"
                  : "text-soilGray bg-slate-100"
              }
                ${currentTab > index ? "pr-9" : ""}
                ${currentTab < index ? "pl-9" : ""}
                `}
              key={index}
              onClick={() => handleTabClick(index)}
            >
              <span className={`flex justify-center`}>
                {tab}
                <span className={`pl-3 my-auto`}>
                  <NumberCircle value={tabNumber ? tabNumber[index] : 0} />
                </span>
              </span>
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
