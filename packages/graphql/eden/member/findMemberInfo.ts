import { gql } from "@apollo/client";

export const FIND_MEMBER_INFO = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordName
      discordAvatar
      discriminator
      memberRole {
        _id
        title
        description
      }
      bio
      links {
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
      previousProjects {
        title
        description
        startDate
        endDate
      }
      # endorsements {
      #   arweaveTransactionID
      #   endorsementMessage
      #   endorser {
      #     _id
      #     discordAvatar
      #     discordName
      #     discriminator
      #   }
      # }
      endorsementsReceive {
        _id
        userSend {
          discordName
        }
        stars
        stake
        endorsementMessage
      }
      endorseSummary {
        summary
        mainNodes {
          node {
            _id
            name
          }
          confidence
        }
        averageStars
        averageStake
        totalStake
        numberEndorsement
        endorsers {
          discordName
        }
      }
      preferences {
        findCoFounder {
          interestedMatch
        }
        findMentee {
          interestedMatch
        }
        findMentor {
          interestedMatch
        }
        findProject {
          interestedMatch
        }
        findUser {
          interestedMatch
        }
      }
    }
  }
`;
