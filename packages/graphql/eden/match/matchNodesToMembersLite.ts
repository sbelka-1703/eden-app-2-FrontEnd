import { gql } from "@apollo/client";

export const MATCH_NODES_MEMBERS_LITE = gql`
  query ($fields: matchNodesToMembersInput) {
    matchNodesToMembers(fields: $fields) {
      member {
        _id
        discordName
        discordAvatar
        discriminator
        bio
        memberRole {
          _id
          title
        }
      }
      matchPercentage {
        totalPercentage
      }
      nodesPercentage {
        totalPercentage
        node {
          _id
          name
          node
        }
      }
    }
  }
`;
