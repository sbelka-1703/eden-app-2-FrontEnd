import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { FIND_GRANTS } from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  Button,
  Card,
  GrantsInfo,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Missing404Section,
  // Loading,
  SEOGrants,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

const GrantsIdPage = ({
  grant,
  error,
}: {
  grant: GrantTemplate;
  error: string;
}) => {
  const router = useRouter();

  if (error) return <Missing404Section />;
  return (
    <>
      <SEOGrants
        name={grant?.name || ""}
        image={grant?.avatar || ""}
        description={grant?.smallDescription || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout className={`bg-background h-screen`}>
          <GridItemTwo> </GridItemTwo>
          <GridItemEight>
            <Card
              shadow
              className={`h-85 scrollbar-hide overflow-y-scroll bg-white p-6`}
            >
              <div className={`h-7/10 scrollbar-hide w-full overflow-scroll`}>
                <GrantsInfo grant={grant} />
              </div>
              <div className={`flex justify-between`}>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.VERCEL_URL}${router.asPath}`
                    );
                    toast.success("grant link copied to clipboard");
                  }}
                >
                  Share
                </Button>
                <Button
                  variant={`primary`}
                  onClick={() => console.log("apply")}
                >
                  Apply
                </Button>
              </div>
            </Card>
          </GridItemEight>
          <GridItemTwo> </GridItemTwo>
        </GridLayout>
      </AppUserSubmenuLayout>
    </>
  );
};

export default GrantsIdPage;

import { GrantTemplate } from "@eden/package-graphql/generated";
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
  const { id } = context.query;

  try {
    const { data } = await client.query({
      query: FIND_GRANTS,
      variables: {
        fields: {
          _id: id,
        },
        ssr: true,
      },
    });

    return {
      props: {
        grant: data.findGrants[0],
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        grant: null,
        error: "Grant not found",
      },
    };
  }
};
