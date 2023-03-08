import { gql } from "@apollo/client";

export const MATCH_NODES_MEMBERS_AI4 = gql`
  query ($fields: matchNodesToMembers_AI4Input) {
    matchNodesToMembers_AI4(fields: $fields) {
      member {
        _id
        discordName
        discordAvatar
        discriminator
        bio
        serverID
        endorsements {
          endorser {
            _id
            discordAvatar
            discordName
            discriminator
          }
        }
        memberRole {
          _id
          title
        }
        nodes {
          nodeData {
            _id
            name
            node
          }
        }
        links {
          name
          url
        }
      }
      matchPercentage {
        totalPercentage
      }
      nodesPercentage {
        node {
          _id
          name
        }
        totalPercentage
        conn_nodeIDs
      }
    }
  }
`;
