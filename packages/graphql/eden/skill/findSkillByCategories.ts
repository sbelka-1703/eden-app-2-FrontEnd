import { gql } from "@apollo/client";

export const FIND_SKILL_BY_CATEGORIES = gql`
  query FindSkills($fields: findSkillSubCategoryInput) {
    findSkillSubCategory(fields: $fields) {
      skills {
        _id
        name
        categorySkills {
          _id
          name
        }
      }
    }
  }
`;
