import { gql } from "@apollo/client";

export const MATCH_MEMBERS_TO_SKILLS = gql`
  query ($fields: matchMembersToSkillInput) {
    matchMembersToSkills(fields: $fields) {
      member {
        _id
        bio
        discordName
        discordAvatar
        skills {
          skillInfo {
            _id
            name
          }
        }
      }
      matchPercentage
    }
  }
`;
