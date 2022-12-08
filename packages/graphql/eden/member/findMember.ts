import { gql } from "@apollo/client";

export const FIND_MEMBER = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordAvatar
      discordName
      bio
      content {
        interest
        mostProud
        showCaseAbility
      }
      archiveProjects
      discriminator
      hoursPerWeek
      interest
      timeZone
      projects {
        champion
        favorite
        info {
          _id
          description
          title
        }
      }
      links {
        name
        url
      }
      skills {
        skillInfo {
          _id
          name
        }
        level
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
      previusProjects {
        title
        description
        startDate
        endDate
      }
      endorsements {
        endorser {
          _id
          discordName
          discordAvatar
          discriminator
        }
        endorsementMessage
        arweaveTransactionID
      }
    }
  }
`;
