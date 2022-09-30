import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CreateSkill($fields: createSkillInput) {
    createSkill(fields: $fields) {
      _id
      name
    }
  }
`;
