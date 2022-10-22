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

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
