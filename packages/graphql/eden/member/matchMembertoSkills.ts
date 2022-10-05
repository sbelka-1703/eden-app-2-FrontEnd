import { gql } from "@apollo/client";

export const MATCH_MEMBERS_TO_SKILLS = gql`
  query MatchSkillsToMembers($fields: matchSkillsToMembersInput) {
    matchSkillsToMembers(fields: $fields) {
      member {
        _id
        discordName
        discordAvatar
        discriminator
        links {
          name
          url
        }
        skills {
          skillInfo {
            _id
            name
          }
          level
        }
        memberRole {
          title
        }
      }
      skillsPercentage {
        info {
          _id
          name
        }
        percentage100
        percentageReal
      }
      matchPercentage {
        totalPercentage
        skillTotalPercentage
        hoursPercentage
        budgetPercentage
      }
    }
  }
`;
