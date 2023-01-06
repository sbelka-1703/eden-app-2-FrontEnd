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
        serverID
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
          shortDescription
          expectations
          benefits
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
          openPositions
          ratePerHour
          hoursPerWeek
        }
      }
      matchPercentage
      projectRoles {
        matchPercentage
        projectRole {
          _id
          title
          description
          shortDescription
          expectations
          benefits
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
          openPositions
          ratePerHour
          hoursPerWeek
        }
      }
    }
  }
`;
