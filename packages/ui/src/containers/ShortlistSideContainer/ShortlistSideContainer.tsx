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
        handleAddRole={() => setOpenModal(LaunchProjectModal.ROLE)}
        handleSelectRole={(role) => setSelectedRole(role)}
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
              percentage={undefined}
              selected={selectedMemberId === member.member._id}
            />
          </div>
        ))}
    </>
  );
};
