import { gql } from "@apollo/client";

export const RELATED_SKILLS = gql`
  mutation RelatedSkills($fields: relatedSkillsInput) {
    relatedSkills(fields: $fields) {
      _id
      name
    }
  }
`;
