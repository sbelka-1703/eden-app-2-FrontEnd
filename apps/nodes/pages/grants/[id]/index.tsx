import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_GRANTS } from "@eden/package-graphql";
import { GrantTemplate, Mutation } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Button,
  Card,
  GrantsInfo,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Loading,
  Missing404Section,
  SEOGrants,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

export const APPLY_GRANT = gql`
  mutation ($fields: applyGrantInput!) {
    applyGrant(fields: $fields) {
      _id
    }
  }
`;

const GrantsIdPage = ({
  grant,
  error,
}: {
  grant: GrantTemplate;
  error: string;
}) => {
  const router = useRouter();
  const { currentUser } = React.useContext(UserContext);
  const [isApplying, setIsApplying] = React.useState(false);

  const [applyGrant] = useMutation(APPLY_GRANT, {
    onCompleted({ applyGrant }: Mutation) {
      if (!applyGrant) console.log("applyGrant is null");
      console.log("applyGrant", applyGrant);
      // setSubmitting(false);
      toast.success("Successfully Applied to Grant");
      setIsApplying(false);
    },
  });

  if (error) return <Missing404Section />;

  const handleApply = () => {
    if (!currentUser) {
      toast.error("You must be logged in to apply for a grant");
      return;
    }
    setIsApplying(true);
    applyGrant({
      variables: {
        fields: {
          grantID: grant._id,
          memberID: currentUser._id,
        },
      },
    });
  };

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
              {isApplying ? (
                <Loading title={`Applying...`} />
              ) : (
                <>
                  <div
                    className={`h-7/10 scrollbar-hide w-full overflow-scroll`}
                  >
                    <GrantsInfo grant={grant} />
                  </div>
                  <div className={`flex justify-between`}>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_VERCEL_URL}${router.asPath}`
                        );
                        toast.success("grant link copied to clipboard");
                      }}
                    >
                      Share
                    </Button>
                    <Button variant={`primary`} onClick={() => handleApply()}>
                      Apply
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </GridItemEight>
          <GridItemTwo> </GridItemTwo>
        </GridLayout>
      </AppUserSubmenuLayout>
    </>
  );
};

export default GrantsIdPage;

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
