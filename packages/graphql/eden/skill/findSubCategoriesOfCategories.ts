import { gql } from "@apollo/client";

export const FIND_SUBCATEGORIES_OF_CATEGORIES = gql`
  query FindSkillCategory($fields: findSkillCategoryInput) {
    findSkillCategory(fields: $fields) {
      _id
      subCategorySkill {
        _id
        name
      }
    }
  }
`;
