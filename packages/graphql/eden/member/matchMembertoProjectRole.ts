import { gql } from "@apollo/client";

export const MATCH_MEMBERS_TO_PROJECT_ROLE = gql`
  query MatchMembersToProjectRole($fields: matchMembersToProjectRoleInput) {
    matchMembersToProjectRole(fields: $fields) {
      matchPercentage
      member {
        _id
        discordName
        discordAvatar
        discriminator
        memberRole {
          title
        }
        skills {
          skillInfo {
            _id
            name
          }
        }
      }
      commonSkills {
        _id
        name
      }
    }
  }
`;
