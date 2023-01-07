/* eslint-disable no-unused-vars */
import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import React, { useReducer, useState } from "react";

import { DiscoverContext } from "./DiscoverContext";

export interface DiscoverProviderProps {
  children: React.ReactNode;
}

export enum DiscoverActionKind {
  SET_ROLES = "SET_ROLES",
}

export interface DiscoverAction {
  type: DiscoverActionKind;
  payload: any;
}

export enum DiscoverModal {
  START_INFO = "start info",
  USER_ROLE = "user role",
  SKILLS_CATEGORY = "skills category",
  SKILLS_SUBCATEGORY = "skills subcategory",
  PRIORITIZE = "prioritize",
  REQUIREMENTS = "requirements",
  PROJECT_INFO = "project info",
  SAVING_PROJECT = "saving project",
  CONGRATULATIONS = "congratulations",
  SKIP_ALERT = "skip alert",
  WARNING = "warning",
  ORDER_SKILLS_FIRST = "order skills first",
  ORDER_SKILLS_SECOND = "order skill second",
}

function projectReducer(project: Project, action: DiscoverAction): Project {
  switch (action.type) {
    case DiscoverActionKind.SET_ROLES:
      return {
        ...project,
        role: action.payload,
      };
    default:
      throw new Error();
  }
}

export const DiscoverProvider = ({ children }: DiscoverProviderProps) => {
  const [project, dispatchProject] = useReducer(projectReducer, {});
  const [openModal, setOpenModal] = useState<DiscoverModal | null>(null);
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
    <DiscoverContext.Provider value={injectContext}>
      {children}
    </DiscoverContext.Provider>
  );
};
