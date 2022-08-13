import { gql } from "@apollo/client";

export const FIND_PROJECTS = gql`
  query ($fields: findProjectsInput) {
    findProjects(fields: $fields) {
      _id
      description
      title
      tweets {
        _id
        approved
        content
        registeredAt
        author {
          discordName
          discordAvatar
        }
      }
      role {
        _id
        archive
        dateRangeEnd
        dateRangeStart
        description
        hoursPerWeek
        title
      }
      dates {
        complition
        kickOff
      }
    }
  }
`;
