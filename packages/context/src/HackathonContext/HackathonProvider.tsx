/* eslint-disable no-unused-vars */
import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import React, { useReducer, useState } from "react";

import { HackathonContext } from "./HackathonContext";

export interface HackathonProviderProps {
  children: React.ReactNode;
}

export enum HackathonActionKind {
  SET_ROLES = "SET_ROLES",
}

export interface HackathonAction {
  type: HackathonActionKind;
  payload: any;
}

export enum HackathonProjectModal {
  SKILLS_CATEGORY = "skills category",
  PRIORITIZE = "prioritize",
  REQUIREMENTS = "requirements",
  PROJECT_INFO = "project info",
  SAVING_PROJECT = "saving project",
  CONGRATULATIONS = "congratulations",
}

function projectReducer(project: Project, action: HackathonAction): Project {
  switch (action.type) {
    case HackathonActionKind.SET_ROLES:
      return {
        ...project,
        role: action.payload,
      };
    default:
      throw new Error();
  }
}

export const HackathonProvider = ({ children }: HackathonProviderProps) => {
  const [project, dispatchProject] = useReducer(projectReducer, {});
  const [openModal, setOpenModal] = useState<HackathonProjectModal | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMemberPercentage, setSelectedMemberPercentage] = useState<
    number | null
  >(null);
  const [matchMembersPage, setMatchMembersPage] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>(
    []
  );

  const injectContext = {
    project: project,
    dispatchProject: dispatchProject,
    openModal: openModal,
    setOpenModal: setOpenModal,
    selectedRole: selectedRole,
    setSelectedRole: setSelectedRole,
    selectedMemberId: selectedMemberId,
    setSelectedMemberId: setSelectedMemberId,
    selectedMemberPercentage: selectedMemberPercentage,
    setSelectedMemberPercentage: setSelectedMemberPercentage,
    matchMembersPage: matchMembersPage,
    setMatchMembersPage: setMatchMembersPage,
    submitting: submitting,
    setSubmitting: setSubmitting,
    selectedCategories: selectedCategories,
    setSelectedCategories: setSelectedCategories,
  };

  return (
    <HackathonContext.Provider value={injectContext}>
      {children}
    </HackathonContext.Provider>
  );
};
