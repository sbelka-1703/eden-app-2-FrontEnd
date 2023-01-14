import { gql } from "@apollo/client";

export const FIND_CURRENTUSER_SUB = gql`
  subscription ($fields: findMembersInput) {
    memberUpdated(fields: $fields) {
      _id
      discordAvatar
      discordName
      serverID
      bio
      content {
        interest
        mostProud
        showCaseAbility
      }
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
      previusProjects {
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
        skills {
          _id
        }
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
