import { Project, RoleType } from "@eden/package-graphql/generated";
import { createContext } from "react";

import { LaunchProjectModal, ProjectAction } from "./LaunchProjectProvider";
export interface LaunchProjectContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<ProjectAction>;
  projectEmoji?: string;
  setProjectEmoji?: any;
  openModal?: LaunchProjectModal | null;
  setOpenModal?: any;
  selectedRole?: RoleType | null;
  setSelectedRole?: any;
  selectedMemberId?: string | null;
  setSelectedMemberId?: any;
  selectedMemberPercentage?: number | null;
  setSelectedMemberPercentage?: any;
  matchMembersPage: number;
  setMatchMembersPage?: any;
  submitting?: boolean;
  setSubmitting?: any;
}

export const LaunchProjectContext = createContext<LaunchProjectContextType>({
  matchMembersPage: 0,
});
