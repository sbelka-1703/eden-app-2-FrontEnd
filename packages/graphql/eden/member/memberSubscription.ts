import { gql } from "@apollo/client";

export const MEMBER_SUBSCRIPTION = gql`
  subscription ($fields: findMembersInput) {
    memberUpdated(fields: $fields) {
      _id
      discordAvatar
      discordName
      bio
      skills {
        skillInfo {
          _id
          name
        }
      }
    }
  }
`;
