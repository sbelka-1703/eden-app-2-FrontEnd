import { createContext, Dispatch } from "react";

export interface SignUpContextType {
  profileBio: string;
  setProfileBio: Dispatch<string>;
  projectDescription: string;
  setProjectDescription: Dispatch<string>;
  // projectRoles: string[];
  // setProjectRoles: Dispatch<string[]>;
}

export const SignUpContext = createContext<SignUpContextType>({
  profileBio: "",
  // eslint-disable-next-line no-empty-function
  setProfileBio: () => {},
  projectDescription: "",
  // eslint-disable-next-line no-empty-function
  setProjectDescription: () => {},
  // projectRoles: [],
  // eslint-disable-next-line no-empty-function
  // setProjectRoles: () => {},
});
