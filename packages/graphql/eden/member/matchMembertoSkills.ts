import { gql } from "@apollo/client";

export const MATCH_MEMBERS_TO_SKILLS = gql`
  query MatchSkillsToMembers($fields: matchSkillsToMembersInput) {
    matchSkillsToMembers(fields: $fields) {
      matchPercentage
      member {
        _id
        discordName
        discordAvatar
        discriminator
        links {
          name
          url
        }
        memberRole {
          title
        }
      }
    }
  }
`;
