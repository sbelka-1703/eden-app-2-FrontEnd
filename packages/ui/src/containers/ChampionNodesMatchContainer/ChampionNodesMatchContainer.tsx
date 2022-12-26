import {
  MatchMembersToSkillOutput,
  Maybe,
  Project,
  RoleType,
  TeamType,
} from "@eden/package-graphql/generated";
import {
  CardGrid,
  TabsSelector,
  TextHeading3,
  UserDiscoverCard,
} from "@eden/package-ui";
import { useState } from "react";
export interface IChampionNodesMatchContainerProps {
  project?: Project;
  selectedRole?: Maybe<RoleType> | null;
  matchingMembers?: Array<Maybe<MatchMembersToSkillOutput>>;
}

export const ChampionNodesMatchContainer = ({
  project,
  selectedRole,
  matchingMembers,
}: IChampionNodesMatchContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["New Match", "Applied", "Invited", "Accepted", "Rejected"];

  const AppliedMembers = project?.team?.filter((mem) => {
    return (
      mem?.phase == "engaged" &&
      (mem.roleID ? mem.roleID == selectedRole?._id : true)
    );
  });
  const InvitedMembers = project?.team?.filter((mem) => {
    return (
      mem?.phase == "invited" &&
      (mem.roleID ? mem.roleID == selectedRole?._id : true)
    );
  });
  const AcceptedMembers = project?.team?.filter((mem) => {
    return (
      mem?.phase == "committed" &&
      (mem.roleID ? mem.roleID == selectedRole?._id : true)
    );
  });
  const RejectedMembers = project?.team?.filter((mem) => {
    return (
      mem?.phase == "rejected" &&
      (mem.roleID ? mem.roleID == selectedRole?._id : true)
    );
  });

  // console.log("matchingMembers", matchingMembers);

  return (
    <div className="m-2 rounded-xl">
      <TabsSelector
        tabs={tabs}
        onSelect={(val) => {
          setActiveTab(val);
        }}
      />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && (
          <ActiveTabMembers
            project={project}
            role={selectedRole}
            matchingMembers={matchingMembers}
          />
        )}
        {activeTab === 1 && (
          <ActiveTabMembers
            project={project}
            role={selectedRole}
            teamMembers={AppliedMembers}
          />
        )}
        {activeTab === 2 && (
          <ActiveTabMembers
            project={project}
            role={selectedRole}
            teamMembers={InvitedMembers}
          />
        )}
        {activeTab === 3 && (
          <ActiveTabMembers
            project={project}
            role={selectedRole}
            teamMembers={AcceptedMembers}
          />
        )}
        {activeTab === 4 && (
          <ActiveTabMembers
            project={project}
            role={selectedRole}
            teamMembers={RejectedMembers}
          />
        )}
      </div>
    </div>
  );
};

interface IActiveTabMembersProps {
  project?: Project;
  role?: Maybe<RoleType>;
  matchingMembers?: Array<Maybe<MatchMembersToSkillOutput>>;
  teamMembers?: Array<Maybe<TeamType>>;
}

const ActiveTabMembers = ({
  project,
  role,
  matchingMembers,
  teamMembers,
}: IActiveTabMembersProps) => {
  return (
    <div className="flex flex-col content-between justify-between">
      <CardGrid>
        {matchingMembers &&
          matchingMembers?.length > 0 &&
          matchingMembers.map(
            (member: Maybe<MatchMembersToSkillOutput>, index: number) => {
              return (
                <UserDiscoverCard
                  key={index}
                  project={project}
                  role={role}
                  invite
                  matchMember={member}
                  phase={""}
                />
              );
            }
          )}
        {teamMembers &&
          teamMembers?.length > 0 &&
          teamMembers.map((member: Maybe<TeamType>, index: number) => {
            return (
              <UserDiscoverCard
                key={index}
                project={project}
                role={role}
                invite
                matchMember={{
                  matchPercentage: { totalPercentage: 0 },
                  member: member?.memberInfo,
                }}
                phase={member?.phase || ""}
              />
            );
          })}
      </CardGrid>
      {(!matchingMembers || matchingMembers?.length < 1) &&
        (!teamMembers || teamMembers?.length < 1) && (
          <TextHeading3 className="mb-4">No matching candidates</TextHeading3>
        )}
    </div>
  );
};
