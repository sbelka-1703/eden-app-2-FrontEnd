import { Project, RoleType } from "@graphql/eden/generated";
import React, { useReducer, useState } from "react";

import { LaunchProjectContext } from "./LaunchProjectContext";

export interface LaunchProjectProviderProps {
  children: React.ReactNode;
}

export enum ProjectActionKind {
  // eslint-disable-next-line no-unused-vars
  SET_NAME = "SET_NAME",
  // eslint-disable-next-line no-unused-vars
  ADD_ROLE = "ADD_ROLE",
  // eslint-disable-next-line no-unused-vars
  SET_ROLE_SKILLS = "SET_ROLE_SKILLS",
}

export interface ProjectAction {
  type: ProjectActionKind;
  payload: any;
}

export enum LaunchProjectModal {
  // eslint-disable-next-line no-unused-vars
  ROLE = "role",
  // eslint-disable-next-line no-unused-vars
  SKILLS = "skills",
}

function projectReducer(project: Project, action: ProjectAction) {
  switch (action.type) {
    case ProjectActionKind.SET_NAME:
      return { ...project, title: action.payload };
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
    default:
      throw new Error();
  }
}

export const LaunchProjectProvider = ({
  children,
}: LaunchProjectProviderProps) => {
  const [project, dispatchProject] = useReducer(projectReducer, {
    __typename: "Project",
    title: null,
    role: [],
  });
  const [openModal, setOpenModal] = useState<LaunchProjectModal | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const injectContext = {
    project: project,
    dispatchProject: dispatchProject,
    openModal: openModal,
    setOpenModal: setOpenModal,
    selectedRole: selectedRole,
    setSelectedRole: setSelectedRole,
  };

  return (
    <LaunchProjectContext.Provider value={injectContext}>
      {children}
    </LaunchProjectContext.Provider>
  );
};
