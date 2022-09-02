import { useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  Card,
  GridItemSix,
  GridItemThree,
  GridLayout,
  ProjectList,
  RecommendedList,
  UserProfileMenu,
} from "ui";

const MyProjectsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);

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

  const committedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "committed"
  );

  // console.log("committedProjects", committedProjects);

  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white p-6">
          <div className={`text-2xl font-medium text-black/80`}>
            My Active Projects
          </div>
          <ProjectList projects={committedProjects} />
        </Card>
      </GridItemSix>
      <GridItemThree>
        <RecommendedList
          projects={dataProjectsRecommended?.findProjects_RecommendedToUser}
        />
      </GridItemThree>
    </GridLayout>
  );
};

export default MyProjectsPage;
