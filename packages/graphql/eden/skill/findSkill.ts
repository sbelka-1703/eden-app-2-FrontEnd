import { gql } from "@apollo/client";

export const FIND_SKILL = gql`
  query ($fields: findSkillInput) {
    findSkill(fields: $fields) {
      _id
      name
      members {
        _id
        discordName
        discordAvatar
        discriminator
      }
    }
  }
`;
