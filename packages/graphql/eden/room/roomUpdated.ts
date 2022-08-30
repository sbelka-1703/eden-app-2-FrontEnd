import { gql } from "@apollo/client";

export const ROOM_UPDATED = gql`
  subscription ($fields: findRoomsInput) {
    roomUpdated(fields: $fields) {
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
