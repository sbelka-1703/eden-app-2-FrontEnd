import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import { createContext } from "react";

import { HackathonAction, HackathonProjectModal } from "./HackathonProvider";
export interface HackathonContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<HackathonAction>;
  openModal?: HackathonProjectModal | null;
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

export const HackathonContext = createContext<HackathonContextType>({
  matchMembersPage: 0,
});
