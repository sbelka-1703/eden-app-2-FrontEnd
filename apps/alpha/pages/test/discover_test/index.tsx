import { useQuery } from "@apollo/client";
import {
  DiscoverContext,
  DiscoverModal,
  DiscoverProvider,
  UserContext,
} from "@eden/package-context";
import { FIND_PROJECT, MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import {
  MatchMembersToSkillOutput,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  CardGrid,
  DiscoverContainer,
  GridItemEight,
  GridItemFour,
  GridLayout,
  SEO,
  UserDiscoverCard,
  WarningCard,
} from "@eden/package-ui";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const DiscoverPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { selectedServerID } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [selectedRole] = useState<RoleType | null>(null);
  const { openModal } = useContext(DiscoverContext);

  const { data: dataMembers } = useQuery(MATCH_NODES_MEMBERS, {
    variables: {
      fields: {
        nodesID: nodesID,
        // TODO: change to selectedServer
        serverID: selectedServerID,
      },
    },
    skip: !nodesID || !selectedServerID,
    context: { serviceName: "soilservice" },
  });

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: router.query.project,
      },
    },
    skip: !router.query.project,
    context: { serviceName: "soilservice" },
  });

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemFour>
          <div className="flex flex-col gap-4 ">
            <Card
              className={`scrollbar-hide max-h-[564px] overflow-scroll bg-white p-4 `}
            >
              <span className="text-lg font-semibold">
                Who are you looking for?
              </span>

              <DiscoverContainer
                setArrayOfNodes={(val) => {
                  setNodesID(val);
                }}
              />
            </Card>
          </div>
        </GridItemFour>
        <GridItemEight>
          <Card
            shadow
            className="scrollbar-hide h-85 overflow-scroll bg-white p-4"
          >
            {nodesID?.length ? (
              <div>
                <span className="text-lg font-semibold">
                  Hiring for your Project :{" "}
                  {dataMembers?.matchNodesToMembers.length ?? 0} Users{" "}
                </span>
                <CardGrid>
                  {dataMembers?.matchNodesToMembers.map(
                    (member: MatchMembersToSkillOutput, index: number) => (
                      <UserDiscoverCard
                        key={index}
                        matchMember={member}
                        role={selectedRole}
                        project={dataProject?.findProject}
                        invite
                        phase=""
                      />
                    )
                  )}
                </CardGrid>
              </div>
            ) : (
              <div className="h-full p-4 text-lg font-semibold">
                Preview Opportunities :
                <div className="flex h-full flex-col items-center justify-center  text-center opacity-20 ">
                  <span>
                    Your profile is 23% complete.
                    <br /> It has to be 60% to be visible to eden network
                  </span>
                  <br />
                  <>
                    <ExclamationIcon color="#ff9c59" width={40} />
                    <span className=" text-zinc-800 opacity-80">
                      Keep adding more info
                    </span>
                  </>
                </div>
              </div>
            )}
          </Card>
        </GridItemEight>
      </GridLayout>
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
import { useRouter } from "next/router";
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
