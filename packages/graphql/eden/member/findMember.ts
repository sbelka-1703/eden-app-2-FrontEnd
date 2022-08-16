import { gql } from "@apollo/client";

export const FIND_MEMBER = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordAvatar
      discordName
      bio
      skills {
        skillInfo {
          _id
          name
        }
      }
      projects {
        champion
        favorite
        info {
          _id
          title
          dates {
            complition
            kickOff
          }
          team {
            phase
            memberInfo {
              _id
              discordAvatar
              discordName
            }
          }
        }
      }
      network {
        discordName
      }
    }
  }
`;
