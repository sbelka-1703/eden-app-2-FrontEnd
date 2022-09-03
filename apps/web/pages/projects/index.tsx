import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
  ADD_FAVOURITE_PROJECT_TO_MEMBER,
  FIND_PROJECTS,
  FIND_PROJECTS_RECOMMENDED,
} from "@graphql/eden";
import { Project } from "@graphql/eden/generated";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  GridItemSix,
  GridItemThree,
  GridLayout,
  ProjectsContainer,
  RecommendedList,
  UserProfileMenu,
} from "ui";

const ProjectsPage: NextPage = () => {
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
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <ProjectsContainer
          allProjects={dataProjectsAll?.findProjects}
          favouriteProjects={currentUser?.projects}
          recommendedProjects={
            dataProjectsRecommended?.findProjects_RecommendedToUser
          }
          updateFavoriteCallback={updateFavoriteCallback}
        />
      </GridItemSix>
      <GridItemThree>
        <RecommendedList
          projects={dataProjectsRecommended?.findProjects_RecommendedToUser}
        />
      </GridItemThree>
    </GridLayout>
  );
};

export default ProjectsPage;
