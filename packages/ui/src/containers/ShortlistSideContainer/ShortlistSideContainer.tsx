import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@eden/package-context";
import {
  CandidateProfileCard,
  Loading,
  ProjectLayoutCard,
} from "@eden/package-ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useContext } from "react";

import { ProjectSkillFilterCard } from "../../cards/ProjectSkillFilterCard";

export interface IShortlistSideContainerProps {
  matchingMembers: any[];
}

export const ShortlistSideContainer = ({
  matchingMembers,
}: IShortlistSideContainerProps) => {
  const {
    project,
    dispatchProject,
    projectEmoji,
    setOpenModal,
    selectedRole,
    setSelectedRole,
    selectedMemberId,
    setSelectedMemberId,
    setSelectedMemberPercentage,
    matchMembersPage,
    setMatchMembersPage,
  } = useContext(LaunchProjectContext);

  const handleSetHoursPerWeek = (e: any) => {
    const newRoles = project?.role?.map((role) => {
      if (role?._id !== selectedRole?._id) return role;
      if (role?._id === selectedRole?._id)
        return {
          ...selectedRole,
          hoursPerWeek: Number(e.target.value),
        };
    });

    dispatchProject!({
      payload: newRoles,
      type: ProjectActionKind.SET_ROLES,
    });
  };

  const handleSetBudget = (val: any) => {
    const newRoles = project?.role?.map((role) => {
      if (role?._id !== selectedRole?._id) return role;
      if (role?._id === selectedRole?._id) {
        return {
          ...role,
          budget: {
            ...role?.budget,
            ...val,
          },
        };
      }
    });

    dispatchProject!({
      payload: newRoles,
      type: ProjectActionKind.SET_ROLES,
    });
  };

  return (
    <>
      <ProjectLayoutCard
        project={project}
        emoji={projectEmoji}
        handleAddRole={() => {
          setOpenModal(LaunchProjectModal.ROLE);
          setSelectedMemberId(null);
          setSelectedMemberPercentage(null);
        }}
        handleEditRole={(id: string) => {
          setSelectedRole(project?.role?.find((role) => role?._id === id));
          setOpenModal(LaunchProjectModal.SKILLS);
        }}
        handleSelectRole={(role) => {
          setSelectedRole(role);
          setSelectedMemberId(null);
          setSelectedMemberPercentage(null);
        }}
        selectedRole={selectedRole}
        showRoles
      />
      {selectedMemberId &&
        (!!matchingMembers.length ? (
          <>
            {matchingMembers.map((member: any, index) => (
              <div
                key={index}
                className="mb-2 cursor-pointer"
                onClick={() => {
                  setSelectedMemberId(member?.member?._id);
                  setSelectedMemberPercentage(member?.matchPercentage);
                }}
              >
                <CandidateProfileCard
                  member={member.member}
                  percentage={member.matchPercentage}
                  selected={selectedMemberId === member.member?._id}
                />

                {/* ------ this is a UI test, do not remove yet :) ------ */}
                {/* <UserCard
              member={{
                ...member.member,
                skills: member.member.skills.slice(0, 2),
              }}
              percentage={member.matchPercentage}
              focused={selectedMemberId === member.member._id}
            /> */}
                {/* ---------------------------------------------------- */}
              </div>
            ))}{" "}
            <section className="flex justify-evenly">
              {!!matchMembersPage && matchMembersPage > 0 && (
                <span
                  className="text-soilGray group cursor-pointer hover:text-slate-400"
                  onClick={() => setMatchMembersPage(matchMembersPage - 1)}
                >
                  <ChevronLeftIcon width={16} className="mr-1 -mt-1 inline" />
                  Previous
                </span>
              )}
              {!!matchingMembers.length && (
                <span
                  className="text-soilGray group cursor-pointer hover:text-slate-400"
                  onClick={() => setMatchMembersPage(matchMembersPage + 1)}
                >
                  Next
                  <ChevronRightIcon width={16} className="ml-1 -mt-1 inline" />
                </span>
              )}
            </section>
          </>
        ) : (
          <Loading />
        ))}

      <p>jjjjjj{JSON.stringify(project?.role)}kkkkk</p>
      {!selectedMemberId && (
        <ProjectSkillFilterCard
          skills={selectedRole?.skills || []}
          handleSetHoursPerWeek={handleSetHoursPerWeek}
          handleSetBudget={handleSetBudget}
        />
      )}
    </>
  );
};
