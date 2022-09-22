import { Project } from "@graphql/eden/generated";
import React, { useReducer } from "react";

import { LaunchProjectContext } from "./LaunchProjectContext";

export interface LaunchProjectProviderProps {
  children: React.ReactNode;
}

export enum ProjectActionKind {
  // eslint-disable-next-line no-unused-vars
  SET_NAME = "SET_NAME",
}

export interface ProjectAction {
  type: ProjectActionKind;
  payload: any;
}

function projectReducer(project: Project, action: ProjectAction) {
  debugger;
  switch (action.type) {
    case ProjectActionKind.SET_NAME:
      return { ...project, title: action.payload };
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
  });

  const injectContext = {
    project: project,
    dispatchProject: dispatchProject,
  };

  return (
    <LaunchProjectContext.Provider value={injectContext}>
      {children}
    </LaunchProjectContext.Provider>
  );
};
