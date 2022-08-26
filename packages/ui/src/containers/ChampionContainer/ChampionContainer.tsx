import { Members, Project } from "@graphql/eden/generated";
import { useState } from "react";
import { TabsSelector, UserCard } from "ui";

const tabs = ["Engaged Talent", "Committed Team"];

export interface ChampionContainerProps {
  project?: Project;
}

export const ChampionContainer = ({ project }: ChampionContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // console.log("project", project);

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && (
          <div className={`pt-6`}>
            <>
              {project?.team &&
                project?.team.map((member, index) => {
                  return (
                    <div key={index}>
                      {member?.phase === "engaged" && (
                        <UserCard member={member?.memberInfo as Members} />
                      )}
                    </div>
                  );
                })}
            </>
          </div>
        )}
        {activeTab === 1 && <div>Committed Team</div>}
      </div>
    </div>
  );
};
