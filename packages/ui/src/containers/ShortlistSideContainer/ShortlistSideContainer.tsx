import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { useContext } from "react";

import { ProjectLayoutCard } from "../../cards";

export interface IShortlistSideContainerProps {}

export const ShortlistSideContainer = ({}: IShortlistSideContainerProps) => {
  const { project, setOpenModal, selectedRole, setSelectedRole } =
    useContext(LaunchProjectContext);

  return (
    <>
      <ProjectLayoutCard
        project={project}
        handleAddRole={() => setOpenModal(LaunchProjectModal.ROLE)}
        handleSelectRole={(role) => setSelectedRole(role)}
        selectedRole={selectedRole}
        showRoles
      />
    </>
  );
};
