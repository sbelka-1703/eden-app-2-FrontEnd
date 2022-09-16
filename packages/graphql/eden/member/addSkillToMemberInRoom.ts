import { gql } from "@apollo/client";

export const ADD_SKILL_TO_MEMBER_IN_ROOM = gql`
  mutation AddSkillsToMemberInRoom($fields: addSkillsToMemberInRoomInput) {
    addSkillsToMemberInRoom(fields: $fields) {
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
    }
  }
`;
