import { gql } from "@apollo/client";

export const FIND_ALL_MAIN_CATEGORIES = gql`
  query FindSkillCategories {
    findSkillCategories(fields: {}) {
      _id
      name
    }
  }
`;
