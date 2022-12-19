import { createContext } from "react";

import { ProjectsModal } from "./ProjectsProvider";
export interface ProjectsContextType {
  openModal?: ProjectsModal | null;
  setOpenModal?: any;
}

export const ProjectsContext = createContext<ProjectsContextType>({});
