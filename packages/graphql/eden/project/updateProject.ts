import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
      title
      description
      role {
        _id
        title
        description
        skills {
          skillData {
            _id
            name
          }
          level
        }
      }
      team {
        memberInfo {
          _id
          discordName
        }
        roleID
        phase
      }
    }
  }
`;
