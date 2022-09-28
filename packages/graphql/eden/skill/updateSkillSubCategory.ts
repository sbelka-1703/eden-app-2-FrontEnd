import { gql } from "@apollo/client";

export const UPDATE_SKILL_SUB_CATEGORY = gql`
  mutation UpdateSkillSubCategory($fields: updateSkillSubCategoryInput) {
    updateSkillSubCategory(fields: $fields) {
      _id
      name
    }
  }
`;
