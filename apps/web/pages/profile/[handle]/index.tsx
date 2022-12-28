import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { FIND_MEMBER } from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Loading,
  MemberInfo,
  SEOProfile,
} from "@eden/package-ui";
import * as React from "react";

const ProfilePage = ({ member }: { member: Members }) => {
  const [experienceOpen, setExperienceOpen] = React.useState<number | null>(
    null
  );

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
                  <MemberInfo
                    member={member}
                    setExperienceOpen={setExperienceOpen!}
                    experienceOpen={experienceOpen!}
                  />
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

  const { data } = await client.query({
    query: FIND_MEMBER,
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
    },
  };
};
