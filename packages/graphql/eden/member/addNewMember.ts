import { gql } from "@apollo/client";

export const ADD_NEW_MEMBER = gql`
  mutation AddNewMember($fields: addNewMemberInput!) {
    addNewMember(fields: $fields) {
      _id
      discordAvatar
      discordName
    }
  }
`;
