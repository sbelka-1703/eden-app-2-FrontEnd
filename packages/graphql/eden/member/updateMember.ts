import { gql } from "@apollo/client";

export const UPDATE_MEMBER = gql`
  mutation ($fields: updateMemberInput!) {
    updateMember(fields: $fields) {
      _id
      discordName
      bio
      interest
      timeZone
      skills {
        skillInfo {
          _id
          name
          authors {
            _id
            discordName
          }
        }
        level
      }
      memberRole {
        _id
        title
      }
    }
  }
`;
