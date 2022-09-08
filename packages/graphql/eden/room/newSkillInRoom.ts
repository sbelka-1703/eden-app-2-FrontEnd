import { gql } from "@apollo/client";

export const NEW_SKILL_IN_ROOM = gql`
  subscription NewSkillInRoom($fields: findRoomsInput) {
    newSkillInRoom(fields: $fields) {
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
    }
  }
`;
