import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  // useQuery,
} from "@apollo/client";
import { FIND_MEMBER_FULL } from "@eden/package-graphql";
// import { Members } from "@eden/package-graphql/generated";
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
// import { useRouter } from "next/router";
import * as React from "react";

// export const useIsMounted = () => {
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => setMounted(true), []);

//   return mounted;
// };

const ProfilePage = ({ member }: { member: Members }) => {
  // const router = useRouter();
  // const { handle } = router.query;
  // const { data: dataMember } = useQuery(FIND_MEMBER_FULL, {
  //   variables: {
  //     fields: {
  //       discordName: handle,
  //     },
  //   },
  //   skip: !handle,
  //   context: { serviceName: "soilservice" },
  // });

  // const profile = dataMember?.findMember;

  // if (!profile)
  //   return (
  //     <div className={`h-screen`}>
  //       <Loading title={`Searching for user...`} />
  //     </div>
  //   );
  // const isMounted = useIsMounted();

  // if (!isMounted) return null;
  // if (!member) return null;
  return (
    <>
      <SEO
        title={`@${member?.discordName} | on `}
        image={member?.discordAvatar || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout className={`bg-background h-screen`}>
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
    query: FIND_MEMBER_FULL,
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
