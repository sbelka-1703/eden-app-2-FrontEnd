import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { FIND_MEMBER_FULL } from "@eden/package-graphql";
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

const ProfilePage = ({ member }: { member: Members }) => {
  const router = useRouter();
  const { handle } = router.query;
  const { data: dataMember } = useQuery(FIND_MEMBER_FULL, {
    variables: {
      fields: {
        discordName: handle,
      },
    },
    skip: !handle,
    context: { serviceName: "soilservice" },
  });

  const profile = dataMember?.findMember;

  if (!profile)
    return (
      <div className={`h-screen`}>
        <Loading title={`Searching for user...`} />
      </div>
    );

  return (
    <>
      <SEO
        title={`@${member?.discordName} | on `}
        image={member?.discordAvatar || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout>
          <GridItemTwo> </GridItemTwo>
          <GridItemEight>
            <Card className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}>
              {member ? (
                <NewProfileContainer user={member} />
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

import type { GetServerSideProps } from "next";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
  cache: new InMemoryCache(),
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { handle } = context.query;
  const { data } = await client.query({
    query: FIND_MEMBER_FULL,
    variables: {
      fields: {
        discordName: handle,
      },
    },
  });

  return {
    props: {
      member: data.findMember,
    },
  };
};
