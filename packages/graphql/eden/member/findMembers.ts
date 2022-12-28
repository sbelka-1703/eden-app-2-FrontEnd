import { gql } from "@apollo/client";

export const FIND_MEMBERS = gql`
  query ($fields: findMembersInput) {
    findMembers(fields: $fields) {
      _id
      discordAvatar
      discordName
      discriminator
      bio
      links {
        name
        url
      }
      previusProjects {
        title
        description
        startDate
        endDate
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
    }
  }
`;
