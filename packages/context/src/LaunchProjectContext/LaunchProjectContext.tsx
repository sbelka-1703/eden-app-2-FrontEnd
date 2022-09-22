import { Project } from "@graphql/eden/generated";
import { createContext } from "react";

import { ProjectAction } from "./LaunchProjectProvider";

export interface LaunchProjectContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<ProjectAction>;
}

export const LaunchProjectContext = createContext<LaunchProjectContextType>({});
