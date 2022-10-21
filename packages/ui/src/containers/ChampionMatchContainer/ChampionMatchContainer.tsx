import {
  Maybe,
  Members,
  Project,
  RoleType,
  TeamType,
} from "@eden/package-graphql/generated";
import { MemberMatchCard, TabsSelector, TextHeading3 } from "@eden/package-ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
export interface ChampionMatchContainerProps {
  project?: Project;
  selectedRole?: Maybe<RoleType> | null;
  matchingMembers?: Members[];
}

const ActiveTabMembers = (teamMembers: any) => {
  const [teamMembersPages, setTeamMembersPages]: any[] = useState([]);
  const [teamMembersPageNo, setTeamMembersPageNo] = useState(0);

  // console.log("teamMembers", teamMembers);

  useEffect(() => {
    const pagedTeamMember: any[] = [];
    const chunkSize = 10;

    for (let i = 0; i < teamMembers?.teamMembers?.length; i += chunkSize) {
      const chunk = teamMembers.teamMembers.slice(i, i + chunkSize);

      pagedTeamMember.push(chunk);
    }
    setTeamMembersPages(pagedTeamMember);
  }, [teamMembers.teamMembers]);

  const onPageChange = (pageNo: number) => {
    setTeamMembersPageNo(pageNo);
  };

  const onClickMore = (id: string) => {
    console.log("On Click More for ", id);
  };

  return (
    <div className="flex flex-col content-between justify-between">
      <div className={`mb-4 grid grid-cols-3 gap-x-4 gap-y-4`}>
        {teamMembers && teamMembers?.teamMembers?.length > 0 ? (
          teamMembersPages[teamMembersPageNo]?.map(
            (member: any | TeamType, index: number) => {
              return (
                <div key={index} className={`m-2`}>
                  <MemberMatchCard
                    member={member.memberInfo || member.member}
                    percentage={member?.matchPercentage?.totalPercentage || ""}
                    matchedMember={member || {}}
                    onClick={() =>
                      onClickMore(
                        member?.memberInfo?._id || member?.member?._id
                      )
                    }
                  />
                </div>
              );
            }
          )
        ) : (
          <TextHeading3 className="mb-4">No matching candidates</TextHeading3>
        )}
      </div>
      <section className="flex justify-evenly">
        {!!teamMembers && teamMembersPageNo > 0 && (
          <span
            className="text-soilGray group cursor-pointer hover:text-slate-400"
            onClick={() => onPageChange(teamMembersPageNo - 1)}
          >
            <ChevronLeftIcon width={16} className="mr-1 -mt-1 inline" />
            Previous
          </span>
        )}
        {teamMembersPageNo < teamMembersPages.length &&
          teamMembersPages.length > 9 && (
            <span
              className="text-soilGray group cursor-pointer hover:text-slate-400"
              onClick={() => onPageChange(teamMembersPageNo + 1)}
            >
              Next
              <ChevronRightIcon width={16} className="ml-1 -mt-1 inline" />
            </span>
          )}
      </section>
    </div>
  );
};

export const ChampionMatchContainer = ({
  project,
  selectedRole,
  matchingMembers,
}: ChampionMatchContainerProps) => {
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
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && (
          <ActiveTabMembers teamMembers={matchingMembers} overflow={true} />
        )}
        {activeTab === 1 && <ActiveTabMembers teamMembers={AppliedMembers} />}
        {activeTab === 2 && <ActiveTabMembers teamMembers={InvitedMembers} />}
        {activeTab === 3 && <ActiveTabMembers teamMembers={AcceptedMembers} />}
        {activeTab === 4 && <ActiveTabMembers teamMembers={RejectedMembers} />}
      </div>
    </div>
  );
};
