import { gql } from "@apollo/client";

export const FIND_MEMBER_FULL = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordAvatar
      discordName
      skills {
        level
        skillInfo {
          _id
          name
          registeredAt
        }
      }
      projects {
        favorite
        champion
        phase
        info {
          _id
          title
          description
        }
      }
      timeZone
      bio
      serverID
      registeredAt
      links {
        name
        url
      }
    }
  }
`;
