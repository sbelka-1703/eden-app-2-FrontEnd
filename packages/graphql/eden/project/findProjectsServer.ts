import { gql } from "@apollo/client";

export const FIND_PROJECTS_SERVER = gql`
  query ($fields: findProjectsInput) {
    findProjects(fields: $fields) {
      _id
      title
      description
      descriptionOneLine
      emoji
      backColorEmoji
      champion {
        _id
        discordAvatar
        discordName
      }
      role {
        _id
        title
        budget {
          perHour
          perMonth
          token
          totalBudget
        }
        dateRangeEnd
        dateRangeStart
        description
        hoursPerWeek
        keyRosponsibilities
        openPositions
        skills {
          comment
          level
          numEndorsement
          skillData {
            _id
            name
          }
        }
      }
    }
  }
`;
