import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  FIND_PROJECTS,
  FIND_PROJECTS_RECOMMENDED,
} from "@eden/package-graphql";
import { useContext } from "react";
import { AppUserMenuLayout, ProjectsContainer } from "ui";

import type { NextPageWithLayout } from "../_app";

const ProjectsPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);

  const { data: dataProjectsAll } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataProjectsAll) console.log("dataProjectsAll", dataProjectsAll);

  const { data: dataProjectsRecommended } = useQuery(
    FIND_PROJECTS_RECOMMENDED,
    {
      variables: {
        fields: {
          memberID: currentUser?._id,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  return (
    <ProjectsContainer
      allProjects={dataProjectsAll?.findProjects}
      favouriteProjects={currentUser?.projects}
      recommendedProjects={
        dataProjectsRecommended?.findProjects_RecommendedToUser
      }
    />
  );
};

ProjectsPage.getLayout = (page) => (
  <AppUserMenuLayout>{page}</AppUserMenuLayout>
);

export default ProjectsPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
