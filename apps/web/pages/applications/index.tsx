import { useQuery } from "@apollo/client";
import { FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
// import { Maybe, Project, ProjectMemberType } from "@graphql/eden/generated";
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

import { UserContext } from "../../context";

const ApplicationsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);
  // const [currentApplication, setCurrentApplication] = useState([]);

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

  // TODO: type error, need to come back to this

  // console.log("currentApplication", currentApplication);

  // const { projects } = currentUser;

  // useEffect(() => {
  //   if (currentUser?.projects && currentUser?.projects.length > 0) {
  //     setCurrentApplication(
  //       currentUser?.projects.filter(
  //         (project: any) => project.phase === "engaged"
  //       )
  //     );
  //   }
  // }, [currentUser?.projects]);

  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white p-6">
          <div className={`text-2xl font-medium text-black/80`}>
            Magic Application List
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

export default ApplicationsPage;
