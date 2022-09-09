import { gql } from "@apollo/client";

export const MEMBER_UPDATED = gql`
  subscription ($fields: findMembersInput) {
    memberUpdated(fields: $fields) {
      _id
      discordName
      discordAvatar
      bio
      skills {
        skillInfo {
          _id
          name
        }
        level
      }
    }
  }
`;
