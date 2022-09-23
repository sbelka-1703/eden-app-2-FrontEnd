import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { Members } from "@graphql/eden/generated";
import { useContext } from "react";

import { CandidateProfileCard, ProjectLayoutCard } from "../../cards";

export interface IShortlistSideContainerProps {
  matchingMembers: Members[];
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
          <div key={index} className="mb-2">
            <CandidateProfileCard
              member={member.member}
              percentage={undefined}
            />
          </div>
        ))}
    </>
  );
};
