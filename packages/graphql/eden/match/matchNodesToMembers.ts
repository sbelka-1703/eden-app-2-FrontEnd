import { gql } from "@apollo/client";

export const MATCH_NODES_MEMBERS = gql`
  query ($fields: matchNodesToMembersInput) {
    matchNodesToMembers(fields: $fields) {
      member {
        _id
        discordName
        discordAvatar
        discriminator
        bio
        endorsements {
          arweaveTransactionID
          endorsementMessage
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
    }
  }
`;
