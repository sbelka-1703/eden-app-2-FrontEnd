import { gql } from "@apollo/client";

export const FIND_PROJECTS = gql`
  query ($fields: findProjectsInput) {
    findProjects(fields: $fields) {
      _id
      description
      title
      team {
        memberInfo {
          _id
          discordName
        }
      }
      role {
        title
        skills {
          skillData {
            _id
            name
          }
        }
      }
      budget {
        totalBudget
        token
      }
      dates {
        complition
        kickOff
      }
    }
  }
`;
