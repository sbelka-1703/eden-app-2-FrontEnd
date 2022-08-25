import { gql } from "@apollo/client";

import { ProjectFragmentLite } from "../fragments/projectFragmentLite";

export const FIND_PROJECTS = gql`
  query ($fields: findProjectsInput) {
    findProjects(fields: $fields) {
      ...ProjectFragmentLite
    }
  }
  ${ProjectFragmentLite}
`;
