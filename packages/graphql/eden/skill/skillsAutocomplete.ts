import { gql } from "@apollo/client";

export const SKILLS_AUTOCOMPLETE = gql`
  query ($fields: skills_autocompleteInput) {
    skills_autocomplete(fields: $fields) {
      _id
      name
      state
      subCategorySkill {
        _id
        name
      }
    }
  }
`;
