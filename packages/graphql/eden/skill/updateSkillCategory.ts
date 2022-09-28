import { gql } from "@apollo/client";

export const UPDATE_SKILL_CATEGORY = gql`
  mutation UpdateSkillCategory($fields: updateSkillCategoryInput) {
    updateSkillCategory(fields: $fields) {
      _id
      name
    }
  }
`;
