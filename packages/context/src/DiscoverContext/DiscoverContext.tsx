import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import { createContext } from "react";

import { DiscoverAction, DiscoverModal } from "./DiscoverProvider";
export interface DiscoverContextType {
  project?: Project;
  dispatchProject?: React.Dispatch<DiscoverAction>;
  openModal?: DiscoverModal | null;
  setOpenModal: React.Dispatch<React.SetStateAction<DiscoverModal | null>>;
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

export const DiscoverContext = createContext<DiscoverContextType>({
  matchMembersPage: 0,
  setOpenModal: () => undefined,
});
