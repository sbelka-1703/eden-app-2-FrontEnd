import { gql } from "@apollo/client";

export const FIND_ALL_CATEGORIES = gql`
  query FindSkillSubCategories {
    findSkillSubCategories(fields: {}) {
      _id
      name
    }
  }
`;
