import { gql } from "@apollo/client";

export const FIND_ROOM = gql`
  query ($fields: findRoomsInput) {
    findRoom(fields: $fields) {
      _id
      name
      description
      avatar
      members {
        _id
        discordName
        discordAvatar
      }
      hosts {
        _id
        discordName
        discordAvatar
      }
      serverID
      registeredAt
    }
  }
`;
