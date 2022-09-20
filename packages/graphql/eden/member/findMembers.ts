import { gql } from "@apollo/client";

export const FIND_MEMBERS = gql`
  query ($fields: findMembersInput) {
    findMembers(fields: $fields) {
      _id
      discordAvatar
      discordName
      discriminator
      bio
      skills {
        skillInfo {
          _id
          name
        }
      }
      projects {
        info {
          title
          _id
        }
      }
      network {
        discordName
      }
      hoursPerWeek
      interest
      timeZone
      memberRole {
        _id
        title
      }
      links {
        name
        url
      }
    }
  }
`;
