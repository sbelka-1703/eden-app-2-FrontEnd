import "./styles.css";

import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface TabsCardProps {}

export const TabsCard = ({}: TabsCardProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`rounded-2xl`}>
      <div className={`flex justify-between text-2xl font-medium`}>
        <button
          className={classNames(
            activeTab === 0
              ? "border-soilGreen-600 left-active text-black/80"
              : "left border-t border-black/20 text-black/20",
            "w-full rounded-tl-2xl py-2 text-center uppercase"
          )}
          onClick={() => setActiveTab(0)}
        >
          General
        </button>
        <button
          className={classNames(
            activeTab === 1
              ? "border-soilGreen-600 center-active text-black/80"
              : "center border-t border-black/20 text-black/20",
            "w-full py-2 text-center uppercase"
          )}
          onClick={() => setActiveTab(1)}
        >
          Background
        </button>
        <button
          className={classNames(
            activeTab === 2
              ? "border-soilGreen-600 right-active text-black/80"
              : "right text-black/20",
            "border-skew-y-12 w-full rounded-tr-2xl py-2 text-center uppercase"
          )}
          onClick={() => setActiveTab(2)}
        >
          Recommendations
        </button>
      </div>
      <div
        className={`border-soilGreen-600 rounded-b-2xl rounded-tr-md border-l-2 border-r-2 border-b-2 p-6`}
      >
        this is tab {activeTab}
      </div>
    </div>
  );
};
