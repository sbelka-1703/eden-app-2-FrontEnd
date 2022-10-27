import {
  Project,
  RoleType,
  SkillCategory,
} from "@eden/package-graphql/generated";
import React, { useReducer, useState } from "react";

import { LaunchProjectContext } from "./LaunchProjectContext";

export interface LaunchProjectProviderProps {
  children: React.ReactNode;
}

export enum ProjectActionKind {
  // eslint-disable-next-line no-unused-vars
  SET_NAME = "SET_NAME",
  // eslint-disable-next-line no-unused-vars
  SET_EMOJI = "SET_EMOJI",
  // eslint-disable-next-line no-unused-vars
  SET_EMOJI_COLOR = "SET_EMOJI_COLOR",
  // eslint-disable-next-line no-unused-vars
  ADD_ROLE = "ADD_ROLE",
  // eslint-disable-next-line no-unused-vars
  SET_ROLE_SKILLS = "SET_ROLE_SKILLS",
  // eslint-disable-next-line no-unused-vars
  SHORTLIST_MEMBER = "SHORTLIST_MEMBER",
  // eslint-disable-next-line no-unused-vars
  REMOVE_SHORTLIST_MEMBER = "REMOVE_SHORTLIST_MEMBER",
  // eslint-disable-next-line no-unused-vars
  SET_EXTRA_DATA = "SET_EXTRA_DATA",
  // eslint-disable-next-line no-unused-vars
  SET_ROLES = "SET_ROLES",
}

export interface ProjectAction {
  type: ProjectActionKind;
  payload: any;
}

export enum LaunchProjectModal {
  // eslint-disable-next-line no-unused-vars
  ROLE = "role",
  // eslint-disable-next-line no-unused-vars
  SKILLS_CATEGORY = "skills category",
  // eslint-disable-next-line no-unused-vars
  SKILLS_SUBCATEGORY = "skills subcategory",
  // eslint-disable-next-line no-unused-vars
  SKILLS_ON_CATEGORY = "skills on category",
  // eslint-disable-next-line no-unused-vars
  PRIORITIZE = "prioritize",
  // eslint-disable-next-line no-unused-vars
  REQUIREMENTS = "requirements",
  // eslint-disable-next-line no-unused-vars
  SKILLS = "skills",
  // eslint-disable-next-line no-unused-vars
  ROLE_DETAIL = "role detail",
  // eslint-disable-next-line no-unused-vars
  SHORTLISTED_PREVIEW = "shortlisted preview",
  // eslint-disable-next-line no-unused-vars
  ROLE_DESCRIPTION = "role description",
  // eslint-disable-next-line no-unused-vars
  PROJECT_INFO = "project info",
  // eslint-disable-next-line no-unused-vars
  SAVING_PROJECT = "saving project",
  // eslint-disable-next-line no-unused-vars
  CONGRATULATIONS = "congratulations",
}

function projectReducer(project: Project, action: ProjectAction): Project {
  switch (action.type) {
    case ProjectActionKind.SET_NAME:
      return { ...project, title: action.payload };
    case ProjectActionKind.SET_EMOJI_COLOR:
      return { ...project, backColorEmoji: action.payload };
    case ProjectActionKind.SET_EMOJI:
      return { ...project, emoji: action.payload };
    case ProjectActionKind.ADD_ROLE:
      return { ...project, role: [...project.role!, action.payload] };
    case ProjectActionKind.SET_ROLE_SKILLS:
      return {
        ...project,
        role: project.role?.map((role) => {
          if (role?._id === action.payload._id) {
            return action.payload;
          }
          return role;
        }),
      };
    case ProjectActionKind.SHORTLIST_MEMBER:
      return {
        ...project,
        team: [
          ...project.team!,
          {
            memberInfo: action.payload.member,
            roleID: action.payload.roleId,
            phase: null,
          },
        ],
      };
    case ProjectActionKind.REMOVE_SHORTLIST_MEMBER:
      return {
        ...project,
        team: project.team?.filter(
          (member) =>
            member?.memberInfo?._id !== action.payload.member.memberInfo._id
        ),
      };
    case ProjectActionKind.SET_EXTRA_DATA:
      const links = [];

      if (action.payload.links.twitter) {
        links.push({
          link: action.payload.links.twitter,
          title: "twitter",
        });
      }
      if (action.payload.links.github) {
        links.push({
          link: action.payload.links.github,
          title: "github",
        });
      }

      return {
        ...project,
        description: action.payload.description,
        descriptionOneLine: action.payload.descriptionOneLine,
        collaborationLinks: links,
      };

    case ProjectActionKind.SET_ROLES:
      return {
        ...project,
        role: action.payload,
      };
    default:
      throw new Error();
  }
}

export const LaunchProjectProvider = ({
  children,
}: LaunchProjectProviderProps) => {
  const [project, dispatchProject] = useReducer(projectReducer, {
    title: "",
    emoji: "👋",
    role: [],
    team: [],
  });
  const [openModal, setOpenModal] = useState<LaunchProjectModal | null>(null);
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
    <LaunchProjectContext.Provider value={injectContext}>
      {children}
    </LaunchProjectContext.Provider>
  );
};
