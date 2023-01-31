import { createContext } from "react";

import { ProjectsModal } from "./ProjectsProvider";
export interface ProjectsContextType {
  openModal?: ProjectsModal | null;
  setOpenModal: React.Dispatch<React.SetStateAction<ProjectsModal | null>>;
}

export const ProjectsContext = createContext<ProjectsContextType>({
  openModal: null,
  setOpenModal: () => undefined,
});
