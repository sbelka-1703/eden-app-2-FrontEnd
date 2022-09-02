import { gql } from "@apollo/client";

export const FIND_ALL_SKILLS = gql`
  query FindSkillSubCategories {
    findSkillSubCategories(fields: {}) {
      name
      skills {
        name
        _id
      }
    }
  }
`;
