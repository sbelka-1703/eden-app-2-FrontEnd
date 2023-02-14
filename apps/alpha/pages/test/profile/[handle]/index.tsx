import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Loading,
  MemberInfoWithGraph,
  Missing404Section,
  SEOProfile,
} from "@eden/package-ui";

const ProfilePage = ({ member, error }: { member: Members; error: string }) => {
  if (error) return <Missing404Section />;

  return (
    <>
      <SEOProfile
        handle={member?.discordName || ""}
        image={member?.discordAvatar || ""}
        role={member?.memberRole?.title || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout className={`bg-background h-screen`}>
          <GridItemTwo> </GridItemTwo>
          <GridItemEight>
            <Card
              shadow
              className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}
            >
              {member ? (
                <div className={`p-4 md:p-8`}>
                  <MemberInfoWithGraph member={member} hasGraph />
                </div>
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

import { Members } from "@eden/package-graphql/generated";
import type { GetServerSideProps } from "next";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { handle } = context.query;

  try {
    const { data } = await client.query({
      query: FIND_MEMBER_INFO,
      variables: {
        fields: {
          discordName: handle,
        },
        ssr: true,
      },
    });

    return {
      props: {
        member: data.findMember,
        error: data.findMember ? null : "Profile not found",
      },
    };
  } catch (error) {
    return {
      props: {
        member: null,
        error: "Profile not found",
      },
    };
  }
};
