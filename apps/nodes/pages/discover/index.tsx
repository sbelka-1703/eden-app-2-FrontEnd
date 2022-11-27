import { gql, useQuery } from "@apollo/client";
import {
  DiscoverContext,
  DiscoverModal,
  DiscoverProvider,
} from "@eden/package-context";
import {
  AppUserSubmenuLayout,
  Card,
  DiscoverModalContainer,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  UserProfileCard,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../_app";

export const MATCH_NODES_MEMBERS = gql`
  query ($fields: matchNodesToMembersInput) {
    matchNodesToMembers(fields: $fields) {
      member {
        _id
        discordName
        discordAvatar
        discriminator
      }
    }
  }
`;

const DiscoverPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(DiscoverContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);

  const { data: dataMembers } = useQuery(MATCH_NODES_MEMBERS, {
    variables: {
      fields: {
        nodesID: nodesID,
      },
    },
    skip: !nodesID,
    context: { serviceName: "soilservice" },
  });

  if (dataMembers) console.log("dataMembers", dataMembers);

  useEffect(() => {
    setOpenModal(DiscoverModal.START_INFO);
  }, []);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree>
          <Card className={`h-85 flex flex-col gap-2`}>
            <UserProfileCard />
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card shadow className="h-85 overflow-auto bg-white p-6">
            discover page
          </Card>
        </GridItemNine>
      </GridLayout>
      <DiscoverModalContainer
        setArrayOfNodes={(val) => {
          console.log("array of nodes val", val);
          setNodesID(val);
        }}
      />
    </>
  );
};

DiscoverPage.getLayout = (page) => (
  <DiscoverProvider>
    <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
  </DiscoverProvider>
);

export default DiscoverPage;

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
