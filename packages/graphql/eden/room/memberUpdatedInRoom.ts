import { gql } from "@apollo/client";

export const MEMBER_UPDATED_IN_ROOM_SUB = gql`
  subscription ($fields: findRoomsInput) {
    memberUpdatedInRoom(fields: $fields) {
      _id
      discordName
      discordAvatar
      bio
      skills {
        skillInfo {
          _id
          name
        }
        level
      }
      links {
        name
        url
      }
      memberRole {
        _id
        title
      }
      nodes {
        nodeData {
          _id
          name
          node
        }
      }
    }
  }
`;
