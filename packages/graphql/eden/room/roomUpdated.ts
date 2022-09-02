import { gql } from "@apollo/client";

export const ROOM_UPDATED = gql`
  subscription ($fields: findRoomsInput) {
    roomUpdated(fields: $fields) {
      members {
        _id
      }
    }
  }
`;
