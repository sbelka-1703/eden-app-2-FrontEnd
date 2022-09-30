import { Members, Project } from "@eden/package-graphql/generated";
import { TabsSelector, UserCard, UserWithDescription } from "@eden/package-ui";
import { useState } from "react";

const tabs = ["Engaged Talent", "Committed Team"];

export interface ChampionContainerProps {
  project?: Project;
  refetch?: () => void;
}

export const ChampionContainer = ({
  project,
  refetch,
}: ChampionContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // console.log("project", project);

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && (
          <div className={`pt-6`}>
            {project?.team &&
              project?.team.map((member, index) => {
                return (
                  <div key={index} className={`mb-6`}>
                    {member?.phase === "engaged" && (
                      <UserCard
                        member={member?.memberInfo as Members}
                        projectId={project?._id as string}
                        engagedCard
                        refetch={refetch}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        )}
        {activeTab === 1 && (
          <div className={`flex justify-between pt-6`}>
            {project?.team &&
              project?.team.map((member, index) => {
                return (
                  <div key={index} className={`mb-6`}>
                    {member?.phase === "committed" && (
                      <UserWithDescription
                        avatarSrc={member?.memberInfo?.discordAvatar as string}
                        name={member?.memberInfo?.discordName as string}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
