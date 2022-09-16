import { gql } from "@apollo/client";

export const FIND_PROJECTS_RECOMMENDED = gql`
  query ($fields: findProjects_RecommendedToUserInput) {
    findProjects_RecommendedToUser(fields: $fields) {
      projectData {
        _id
        description
        title
        champion {
          _id
          discordName
          discordAvatar
        }
      }
      role {
        _id
        description
        title
      }
      matchPercentage
    }
  }
`;
