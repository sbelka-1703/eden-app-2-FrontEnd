/* eslint-disable no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import {
  GrantsContext,
  GrantsModal,
  GrantsProvider,
  UserContext,
} from "@eden/package-context";
import { GrantTemplate } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  GrantsCard,
  GrantsModalContainer,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  UserProfileCard,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../_app";

export const FIND_GRANTS = gql`
  query ($fields: findGrantsInput) {
    findGrants(fields: $fields) {
      _id
      avatar
      name
      smallDescription
      amount
      applicationProcess
      difficulty
      discributed
      requirments
      resources {
        name
        url
      }
      tags
    }
  }
`;

const GrantsPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(GrantsContext);
  const { memberServers } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [serverID, setServerID] = useState<string | null>(null);

  const { data: dataGrants } = useQuery(FIND_GRANTS, {
    variables: {
      fields: {
        _id: null,
        // nodesID: nodesID,
        // TODO: change to selectedServer
        // serverID: serverID,
      },
    },
    // skip: !nodesID || !serverID,
    context: { serviceName: "soilservice" },
  });

  if (dataGrants) console.log("dataGrants", dataGrants);

  useEffect(() => {
    setOpenModal(GrantsModal.START_INFO);
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
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dataGrants?.findGrants?.map(
                (grant: GrantTemplate, index: number) => (
                  <GrantsCard key={index} grant={grant} />
                )
              )}
              {/* {dataMembers?.matchNodesToMembers?.map(
                (member: MatchMembersToSkillOutput, index: number) => (
                  <GrantsCard key={index} matchMember={member} />
                )
              )} */}
            </div>
          </Card>
        </GridItemNine>
      </GridLayout>
      <GrantsModalContainer
        setArrayOfNodes={(val) => {
          // console.log("array of nodes val", val);
          setNodesID(val);
        }}
      />
    </>
  );
};

GrantsPage.getLayout = (page) => (
  <GrantsProvider>
    <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
  </GrantsProvider>
);

export default GrantsPage;

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
