import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_PROJECT, MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import { NodesType } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  ChampionNodesMatchContainer,
  EditProjectModal,
  GridItemNine,
  GridItemThree,
  GridLayout,
  ProjectEditSelectorCard,
  SEO,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { selectedServer } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { data: dataProject, refetch: refetchProject } = useQuery(
    FIND_PROJECT,
    {
      variables: {
        fields: {
          _id,
        },
      },
      skip: !_id,
      context: { serviceName: "soilservice" },
    }
  );

  const [selectedRole, setSelectedRole] = useState(
    dataProject?.findProject?.role[0]
  );

  const { data: matchingMembers } = useQuery(MATCH_NODES_MEMBERS, {
    variables: {
      fields: {
        nodesID: selectedRole?.nodes.map(
          (node: NodesType) => node?.nodeData?._id
        ),
        serverID: selectedServer?._id,
      },
    },
    skip: !selectedRole || !selectedServer?._id,
    context: { serviceName: "soilservice" },
  });

  // if (matchingMembers) console.log("matchingMembers", matchingMembers);

  // project data with shortlist
  if (!dataProject) return null;

  return (
    <>
      <SEO />
      <EditProjectModal
        showModal={showModal}
        project={dataProject?.findProject}
        onClose={() => setShowModal(false)}
      />
      <GridLayout>
        <GridItemThree>
          <ProjectEditSelectorCard
            project={dataProject?.findProject}
            handleSelectRole={(role) => {
              setSelectedRole(role);
            }}
            selectedRole={selectedRole}
            onBack={() => router.back()}
            onEdit={() => setShowModal(!showModal)}
          />
        </GridItemThree>
        <GridItemNine>
          <ChampionNodesMatchContainer
            selectedRole={selectedRole}
            project={dataProject.findProject}
            matchingMembers={matchingMembers?.matchNodesToMembers}
          />
        </GridItemNine>
      </GridLayout>
    </>
  );
};

ProjectPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default ProjectPage;

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
