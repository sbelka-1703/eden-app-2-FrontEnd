import { gql } from "@apollo/client";

export const FIND_PROJECTS_RECOMMENDED = gql`
  query ($fields: findProjects_RecommendedToUserInput) {
    findProjects_RecommendedToUser(fields: $fields) {
      matchPercentage
      projectData {
        _id
        title
        description
      }
    }
  }
`;
