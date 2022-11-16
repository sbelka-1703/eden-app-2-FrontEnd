import { gql } from "@apollo/client";

export const MATCH_SKILLS_TO_PROJECTS = gql`
  query ($fields: matchSkillsToProjectsInput) {
    matchSkillsToProjects(fields: $fields) {
      matchPercentage
      projectRoles {
        matchPercentage
        commonSkills {
          _id
          name
        }
        projectRole {
          _id
          title
          description
          openPositions
          keyRosponsibilities
          hoursPerWeek
          skills {
            level
            skillData {
              _id
              name
            }
          }
        }
      }
      project {
        _id
        title
        description
        descriptionOneLine
        emoji
        backColorEmoji
        champion {
          _id
          discordName
          discordAvatar
        }
        serverID
      }
    }
  }
`;
