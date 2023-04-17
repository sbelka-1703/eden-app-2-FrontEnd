import { gql } from "@apollo/client";

export const FIND_MEMBER_FULL = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordAvatar
      discordName
      bio
      archiveProjects
      discriminator
      hoursPerWeek
      interest
      timeZone
      location
      budget {
        perHour
      }
      experienceLevel {
        total
        years
      }
      projects {
        champion
        phase
        favorite
        info {
          _id
          title
          description
          emoji
          descriptionOneLine
          backColorEmoji
          serverID
          collaborationLinks {
            title
            link
          }
          role {
            _id
            title
            description
            dateRangeStart
            dateRangeEnd
            hoursPerWeek
          }
          dates {
            kickOff
            complition
          }
          champion {
            _id
            discordName
            discordAvatar
          }
        }
        role {
          _id
          title
          description
          dateRangeStart
          dateRangeEnd
          hoursPerWeek
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
        description
        skills {
          _id
        }
      }
      # endorsements {
      #   endorser {
      #     _id
      #     discordName
      #     discordAvatar
      #     discriminator
      #   }
      #   endorsementMessage
      #   arweaveTransactionID
      # }
      totalIncome
      endorsementsSendStats {
        reputation
        totalReward
      }
      endorsementsSend {
        _id
      }
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
    }
  }
`;
