import { gql } from "@apollo/client";

export const FIND_ROOM = gql`
  query ($fields: findRoomsInput) {
    findRoom(fields: $fields) {
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
