import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import { createContext } from "react";

import { GrantsAction, GrantsModal } from "./GrantsProvider";
export interface GrantsContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<GrantsAction>;
  openModal?: GrantsModal | null;
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

export const GrantsContext = createContext<GrantsContextType>({
  matchMembersPage: 0,
});
