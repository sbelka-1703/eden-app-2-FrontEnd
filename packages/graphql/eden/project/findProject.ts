import { gql } from "@apollo/client";

export const FIND_PROJECT = gql`
  query ($fields: findProjectInput) {
    findProject(fields: $fields) {
      _id
      title
      description
      descriptionOneLine
      emoji
      serverID
      backColorEmoji
      collaborationLinks {
        link
        title
      }
      champion {
        _id
        discordName
        discordAvatar
        discriminator
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
      }
      team {
        memberInfo {
          _id
          discordName
          discordAvatar
          attributes {
            Motivator
            Coordinator
            Director
            Helper
            Inspirer
            Observer
            Reformer
            Supporter
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
          }
        }
        phase
        roleID
      }
      role {
        _id
        title
        shortDescription
        description
        ratePerHour
        hoursPerWeek
        dateRangeStart
        dateRangeEnd
        openPositions
        expectations
        benefits
        keyRosponsibilities
        nodes {
          nodeData {
            _id
            name
            node
          }
        }
      }
      dates {
        complition
        kickOff
      }
      budget {
        token
        totalBudget
      }
      tweets {
        _id
        content
        registeredAt
        approved
        title
        author {
          _id
          discordName
          discordAvatar
        }
      }
    }
  }
`;
