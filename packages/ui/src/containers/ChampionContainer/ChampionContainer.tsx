import { useState } from "react";
import { TabsCard } from "ui";

const tabs = ["Engaged Talent", "Committed Team"];

export interface ChampionContainerProps {}

export const ChampionContainer = ({}: ChampionContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-xl">
      <TabsCard tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && <div className={`pt-6`}>Engaged Talent</div>}
        {activeTab === 1 && <div>Committed Team</div>}
      </div>
    </div>
  );
};
