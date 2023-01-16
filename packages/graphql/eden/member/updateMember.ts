import { gql } from "@apollo/client";

export const UPDATE_MEMBER = gql`
  mutation ($fields: updateMemberInput!) {
    updateMember(fields: $fields) {
      _id
      discordName
      bio
      interest
      timeZone
      memberRole {
        _id
        title
      }
      onbording {
        signup
        percentage
      }
    }
  }
`;
