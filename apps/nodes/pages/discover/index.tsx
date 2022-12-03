import { useQuery } from "@apollo/client";
import {
  DiscoverContext,
  DiscoverModal,
  DiscoverProvider,
  UserContext,
} from "@eden/package-context";
import { MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import { MatchMembersToSkillOutput } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  CardGrid,
  DiscoverModalContainer,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  UserDiscoverCard,
  UserProfileCard,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../_app";

const DiscoverPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(DiscoverContext);
  const { memberServers } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [serverID, setServerID] = useState<string | null>(null);

  const { data: dataMembers } = useQuery(MATCH_NODES_MEMBERS, {
    variables: {
      fields: {
        nodesID: nodesID,
        // TODO: change to selectedServer
        serverID: serverID,
      },
    },
    skip: !nodesID || !serverID,
    context: { serviceName: "soilservice" },
  });

  // if (dataMembers) console.log("dataMembers", dataMembers);

  useEffect(() => {
    setOpenModal(DiscoverModal.START_INFO);
  }, []);

  useEffect(() => {
    if (memberServers) {
      setServerID(memberServers[1]._id);
    }
  }, [memberServers]);

  // if (memberServers) console.log("memberServers", memberServers[1]._id);

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
          <Card
            shadow
            className="scrollbar-hide h-85 overflow-scroll bg-white p-4"
          >
            <CardGrid>
              {dataMembers?.matchNodesToMembers?.map(
                (member: MatchMembersToSkillOutput, index: number) => (
                  <UserDiscoverCard key={index} matchMember={member} />
                )
              )}
            </CardGrid>
          </Card>
        </GridItemNine>
      </GridLayout>
      <DiscoverModalContainer
        setArrayOfNodes={(val) => {
          // console.log("array of nodes val", val);
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
