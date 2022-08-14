import { gql } from "@apollo/client";

export const FIND_SKILLS = gql`
  query ($fields: findSkillsInput) {
    findSkills(fields: $fields) {
      _id
      name
      state
      members {
        _id
        discordName
      }
    }
  }
`;
