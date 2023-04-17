import { gql } from "@apollo/client";

export const FIND_CURRENTUSER_SUB = gql`
  subscription ($fields: findMembersInput) {
    memberUpdated(fields: $fields) {
      _id
      discordAvatar
      discordName
      serverID
      bio
      discriminator
      hoursPerWeek
      interest
      timeZone
      nodes {
        nodeData {
          _id
          name
          node
        }
      }
      location
      budget {
        perHour
      }
      experienceLevel {
        total
        years
      }
      previousProjects {
        title
        description
        startDate
        endDate
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
          team {
            phase
            memberInfo {
              _id
            }
          }
          role {
            _id
            title
            description
            dateRangeStart
            dateRangeEnd
            hoursPerWeek
            nodes {
              nodeData {
                _id
                name
                node
              }
            }
          }
          dates {
            kickOff
            complition
          }
          champion {
            _id
            discordName
            discordAvatar
            discriminator
          }
        }
        role {
          _id
          title
          description
          dateRangeStart
          dateRangeEnd
          hoursPerWeek
          budget {
            totalBudget
            token
            perHour
            perMonth
          }
        }
      }
      links {
        name
        url
      }
      onbording {
        percentage
        signup
      }
      memberRole {
        _id
        title
        description
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
