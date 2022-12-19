/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { ProjectsContext } from "./ProjectsContext";

export interface ProjectsProviderProps {
  children: React.ReactNode;
}

export enum ProjectsModal {
  START_WELCOME = "start welcome",
  NODES_ROLE = "nodes role",
  NODES_PROJECTS = "nodes projects",
  REQUIREMENTS = "requirements",
  SKIP_ALERT = "skip alert",
  WARNING = "warning",
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [openModal, setOpenModal] = useState<ProjectsModal | null>(null);

  const injectContext = {
    openModal: openModal,
    setOpenModal: setOpenModal,
  };

  return (
    <ProjectsContext.Provider value={injectContext}>
      {children}
    </ProjectsContext.Provider>
  );
};
