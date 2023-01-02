import { useQuery } from "@apollo/client";
import {
  DiscoverContext,
  DiscoverProvider,
  UserContext,
} from "@eden/package-context";
import { FIND_PROJECT, MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import { ExclamationIcon } from "@heroicons/react/solid";
import {
  MatchMembersToSkillOutput,
  NodesType,
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
  RoleList,
  SEO,
  UserDiscoverCard,
  WarningCard,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";

import welcome from "../../public/welcome.png";
import type { NextPageWithLayout } from "../../_app";

const DiscoverPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { memberServers } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [serverID, setServerID] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const { project, openModal, setOpenModal } = useContext(DiscoverContext);

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

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: router.query.project,
      },
    },
    skip: !router.query.project,
    context: { serviceName: "soilservice" },
  });

  useEffect(() => {
    if (memberServers) {
      setServerID(memberServers[1]._id);
    }
  }, [memberServers]);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemFour>
          <div className="flex flex-col gap-4 ">
            <Card className={`scrollbar-hide overflow-scroll bg-white p-4 `}>
              <span className="text-lg font-semibold">
                Find out your Profile
              </span>
              <DiscoverContainer
                setArrayOfNodes={(val) => {
                  setNodesID(val);
                }}
              />
            </Card>
            {!openModal && (
              <WarningCard
                onClickCompleteProfile={() =>
                  router.push("/create-project?from=discover")
                }
                text1="YOUR PROFILE IS 23% COMPLETE. IT HAS TO BE 60%+ TO BE VISIBLE TO EDEN NETWORK"
                text2="Keep adding more info"
              />
            )}
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

import { Maybe } from "graphql/jsutils/Maybe";
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
