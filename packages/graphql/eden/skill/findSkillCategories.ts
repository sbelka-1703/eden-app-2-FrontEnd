import { gql } from "@apollo/client";

export const FIND_SKILL_CATEGORIES = gql`
  query ($fields: findSkillCategoriesInput) {
    findSkillCategories(fields: $fields) {
      _id
      name
      description
      skills {
        _id
        name
      }
      subCategorySkill {
        _id
        name
        skills {
          name
          _id
        }
      }
    }
  }
`;
