import { gql } from "@apollo/client";

export const FIND_CURRENTUSER = gql`
  query ($fields: findMemberInput) {
    findMember(fields: $fields) {
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
      attributes {
        Coordinator
        Director
        Helper
        Inspirer
        Motivator
        Observer
        Reformer
        Supporter
      }
      archiveProjects
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
          garden_teams {
            _id
            name
            description
            champion {
              _id
              discordName
            }
            categoryDiscordlD
            channelGeneralDiscordID
            forumDiscordID
          }
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
            budget {
              totalBudget
              token
              perHour
              perMonth
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
      skills {
        skillInfo {
          _id
          name
        }
        level
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
