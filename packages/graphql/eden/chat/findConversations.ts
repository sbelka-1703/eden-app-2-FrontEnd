import { gql } from "@apollo/client";

export const FIND_CONVERSATIONS = gql`
  query FindConversations($fields: findConversationsInput) {
    findConversations(fields: $fields) {
      _id
      userID
      conversation {
        role
        content
      }
    }
  }
`;
