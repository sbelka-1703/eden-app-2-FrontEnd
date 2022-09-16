import { gql } from "@apollo/client";

export const ADD_SKILL_TO_MEMBER = gql`
  mutation ($fields: addSkillToMember_Input!) {
    addSkillToMember(fields: $fields) {
      _id
      discordName
      skills {
        skillInfo {
          _id
          name
        }
      }
    }
  }
`;
