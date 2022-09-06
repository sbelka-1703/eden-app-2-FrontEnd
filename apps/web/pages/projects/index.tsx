import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
  ADD_FAVOURITE_PROJECT_TO_MEMBER,
  FIND_PROJECTS,
  FIND_PROJECTS_RECOMMENDED,
} from "@graphql/eden";
import { Project } from "@graphql/eden/generated";
// import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line camelcase
// import { unstable_getServerSession } from "next-auth/next";
import { useContext } from "react";
import { AppUserMenuLayout, ProjectsContainer } from "ui";

import type { NextPageWithLayout } from "../_app";
// import { authOptions } from "../api/auth/[...nextauth]";

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

  // if (dataProjectsRecommended)
  //   console.log("dataProjectsRecommended", dataProjectsRecommended);

  const [updateFavorite] = useMutation(ADD_FAVOURITE_PROJECT_TO_MEMBER, {});

  const updateFavoriteCallback = (project: Project) => {
    updateFavorite({
      variables: {
        fields: {
          memberID: currentUser?._id,
          projectID: project._id,
          favorite: !currentUser?.projects?.find(
            (proj) => proj?.info?._id === project._id
          )?.favorite,
        },
      },
    });
  };

  return (
    <ProjectsContainer
      allProjects={dataProjectsAll?.findProjects}
      favouriteProjects={currentUser?.projects}
      recommendedProjects={
        dataProjectsRecommended?.findProjects_RecommendedToUser
      }
      updateFavoriteCallback={updateFavoriteCallback}
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
