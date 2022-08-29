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
  RecommendedList,
  UserProfileMenu,
} from "ui";

const MyProjectsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) console.log("currentUser", currentUser);

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
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white p-6">
          <div className={`text-2xl font-medium text-black/80`}>
            My Active Projects
          </div>
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
