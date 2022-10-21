import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import { createContext } from "react";

import { LaunchProjectModal, ProjectAction } from "./LaunchProjectProvider";
export interface LaunchProjectContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<ProjectAction>;
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
  selectedCategories?: SkillCategory[];
  setSelectedCategories?: any;
}

export const LaunchProjectContext = createContext<LaunchProjectContextType>({
  matchMembersPage: 0,
});
