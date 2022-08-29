import { createContext, Dispatch } from "react";

export interface LaunchContextType {
  projectName: string;
  setProjectName: Dispatch<string>;
  projectDescription: string;
  setProjectDescription: Dispatch<string>;
  // projectRoles: string[];
  // setProjectRoles: Dispatch<string[]>;
}

export const LaunchContext = createContext<LaunchContextType>({
  projectName: "",
  // eslint-disable-next-line no-empty-function
  setProjectName: () => {},
  projectDescription: "",
  // eslint-disable-next-line no-empty-function
  setProjectDescription: () => {},
  // projectRoles: [],
  // eslint-disable-next-line no-empty-function
  // setProjectRoles: () => {},
});
