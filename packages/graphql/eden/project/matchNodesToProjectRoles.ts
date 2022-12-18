import { gql } from "@apollo/client";

export const MATCH_NODES_TO_PROJECT_ROLES = gql`
  query ($fields: matchNodesToProjectRolesInput) {
    matchNodesToProjectRoles(fields: $fields) {
      project {
        _id
        title
        descriptionOneLine
        description
        emoji
        backColorEmoji
        champion {
          _id
          discordName
          discriminator
          discordAvatar
        }
        role {
          _id
          title
          description
          dateRangeStart
          dateRangeEnd
          hoursPerWeek
          openPositions
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
        }
      }
      matchPercentage
      projectRoles {
        matchPercentage
        projectRole {
          _id
          title
          description
          openPositions
          hoursPerWeek
          dateRangeStart
          dateRangeEnd
          keyRosponsibilities
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
        }
      }
    }
  }
`;
