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
    }
  }
`;
