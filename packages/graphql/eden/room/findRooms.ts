import { gql } from "@apollo/client";

export const FIND_ROOMS = gql`
  query ($fields: findRoomsInput) {
    findRooms(fields: $fields) {
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
