import { gql } from "@apollo/client";

export const FIND_GRANTS = gql`
  query ($fields: findGrantsInput) {
    findGrants(fields: $fields) {
      _id
      name
      smallDescription
      description
      avatar
      tags
      distributed
      maxDistributed
      amount
      difficulty
      applicationProcess
      requirments
      resources {
        name
        url
      }
      nodes {
        nodeData {
          _id
          name
          node
        }
      }
      serverID
      membersApplied {
        _id
        discordName
        discordAvatar
      }
    }
  }
`;
