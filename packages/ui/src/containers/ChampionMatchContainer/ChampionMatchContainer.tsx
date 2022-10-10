import { TeamType, Project } from "@eden/package-graphql/generated";
import { TabsSelector, MemberMatchCard } from "@eden/package-ui";
import { useState } from "react";

export interface ChampionMatchContainerProps {
  project?: Project;
}

const ActiveTabMembers = (teamMembers: any) => {
  return (
    <div className={`mb-4 grid grid-cols-3 gap-x-10 gap-y-10`}>
      {teamMembers &&
        teamMembers?.teamMembers?.map((member: any, index: number) => {
          return (
            <div key={index} className={`m-2`}>
              <MemberMatchCard member={member.memberInfo} percentage={"44"} />
            </div>
          );
        })}
    </div>
  );
};

export const ChampionMatchContainer = ({
  project,
}: ChampionMatchContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["New Match", "Applied", "Invited", "Accepted", "Rejected"];
  const AppliedMembers = project?.team?.filter((mem) => {
    return mem?.phase == "engaged";
  });
  const InvitedMembers = project?.team?.filter((mem) => {
    return mem?.phase == "invited";
  });
  const AcceptedMembers = project?.team?.filter((mem) => {
    return mem?.phase == "shortlisted";
  });
  const RejectedMembers = project?.team?.filter((mem) => {
    return mem?.phase == "rejected";
  });
  const NewMembers = project?.team?.filter((mem) => {
    return mem?.phase == "committed";
  });

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && <ActiveTabMembers teamMembers={NewMembers} />}
        {activeTab === 1 && <ActiveTabMembers teamMembers={AppliedMembers} />}
        {activeTab === 2 && <ActiveTabMembers teamMembers={InvitedMembers} />}
        {activeTab === 3 && <ActiveTabMembers teamMembers={AcceptedMembers} />}
        {activeTab === 4 && <ActiveTabMembers teamMembers={RejectedMembers} />}
      </div>
    </div>
  );
};
