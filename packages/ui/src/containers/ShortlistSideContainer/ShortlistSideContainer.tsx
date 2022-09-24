import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { useContext } from "react";

import { CandidateProfileCard, ProjectLayoutCard } from "../../cards";

export interface IShortlistSideContainerProps {
  matchingMembers: any[];
}

export const ShortlistSideContainer = ({
  matchingMembers,
}: IShortlistSideContainerProps) => {
  const {
    project,
    setOpenModal,
    selectedRole,
    setSelectedRole,
    selectedMemberId,
    setSelectedMemberId,
    setSelectedMemberPercentage,
  } = useContext(LaunchProjectContext);

  return (
    <>
      <ProjectLayoutCard
        project={project}
        handleAddRole={() => {
          setOpenModal(LaunchProjectModal.ROLE);
          setSelectedMemberId(null);
          setSelectedMemberPercentage(null);
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
        matchingMembers.map((member: any, index) => (
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
              selected={selectedMemberId === member.member._id}
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
        ))}
    </>
  );
};
