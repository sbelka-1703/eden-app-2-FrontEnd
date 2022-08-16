import { MouseEvent, useState } from "react";

// TODO: need to revisit this, tabs might be better as a prop.  Also a onSelect callback is needed.

const tabs = [
  {
    title: "All projects",
    fullTitle: "All projects",
  },
  {
    title: "Recommended",
    fullTitle: "Recommended",
  },
  {
    title: "Favourite",
    fullTitle: "Favourite",
  },
];

export interface TabsCardProps {}

export const TabsCard = ({}: TabsCardProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
    sideCorner = ""
  ) => {
    if (sideCorner === "right" && index < tabs.length - 1) {
      setCurrentTab(index + 1);
    } else if (sideCorner === "left" && currentTab > 0) {
      setCurrentTab(index - 1);
    } else {
      setCurrentTab(index);
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

  return (
    <div className="flex">
      {tabs &&
        tabs.map((tab, index) => (
          <div
            style={{ zIndex: calculateTabZindex(index) }}
            className={`relative h-10 cursor-pointer ${
              currentTab == index ? "z-50" : "bg-slate-100"
            }`}
            key={index}
          >
            {index != 0 && index - 1 != currentTab && (
              <button
                className={`absolute -left-10 top-0 fill-slate-100 stroke-slate-200 ${
                  currentTab == index ? "fill-white" : ""
                }`}
                style={{ strokeDasharray: "0,0,57,100" }}
                onClick={(e) => handleTabClick(e, index, "left")}
              >
                <svg height="40" width="40">
                  <polygon points="40,0 0,40 40,40" />
                </svg>
              </button>
            )}
            <button
              className={`relative h-full border-t px-3 pt-2 text-center font-medium uppercase ${
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
              onClick={(e) => handleTabClick(e, index)}
            >
              <span>{tab.title}</span>
            </button>
            {index != currentTab - 1 && (
              <button
                className={`absolute -right-10 top-0 fill-slate-100 stroke-slate-200 ${
                  currentTab == index ? "fill-white" : ""
                }`}
                style={{ strokeDasharray: "0,81,100" }}
                onClick={(e) => handleTabClick(e, index, "right")}
              >
                <svg height="40" width="40">
                  <polygon points="0,0 0,40 40,40" />
                </svg>
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
