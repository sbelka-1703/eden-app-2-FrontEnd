import { gql } from "@apollo/client";

export const FIND_ALL_CATEGORIES = gql`
  query FindSkillSubCategories($fields: findSkillSubCategoriesInput) {
    findSkillSubCategories(fields: $fields) {
      _id
      name
      skills {
        _id
        name
      }
    }
  }
`;
