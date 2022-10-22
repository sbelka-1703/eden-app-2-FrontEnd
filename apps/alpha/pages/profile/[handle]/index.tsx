import { gql, useQuery } from "@apollo/client";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Loading,
  NewProfileContainer,
  SEO,
} from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../../_app";

const FIND_MEMBER = gql`
  query ($fields: findMemersByIDOrDiscordNameInput) {
    findMemberByIDOrDiscordName(fields: $fields) {
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
    }
  }
`;

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { data: dataMember } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        discordName: handle,
      },
    },
    skip: !handle,
    context: { serviceName: "soilservice" },
  });

  //   if (dataMember?.findMemberByIDOrDiscordName)
  //     console.log(dataMember?.findMemberByIDOrDiscordName);

  const profile = dataMember?.findMemberByIDOrDiscordName;

  return (
    <>
      <SEO
        title={`@${profile?.discordName} | on `}
        image={profile?.discordAvatar || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout>
          <GridItemTwo> </GridItemTwo>
          <GridItemEight>
            <Card className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}>
              {dataMember?.findMemberByIDOrDiscordName ? (
                <NewProfileContainer
                  user={dataMember?.findMemberByIDOrDiscordName as Members}
                />
              ) : (
                <Loading title={`Searching...`} />
              )}
            </Card>
          </GridItemEight>
          <GridItemTwo> </GridItemTwo>
        </GridLayout>
      </AppUserSubmenuLayout>
    </>
  );
};

export default ProfilePage;
