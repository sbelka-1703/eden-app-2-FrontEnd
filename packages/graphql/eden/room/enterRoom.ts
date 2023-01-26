import { gql } from "@apollo/client";

export const ENTER_ROOM = gql`
  mutation ($fields: enterRoomInput!) {
    enterRoom(fields: $fields) {
      _id
      name
      members {
        _id
        discordName
      }
      registeredAt
    }
  }
`;
