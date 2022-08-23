// import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  Card,
  GridItemSix,
  GridItemThree,
  GridLayout,
  UserProfileMenu,
} from "ui";

import { UserContext } from "../../context";

const MyProjectsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) console.log("currentUser", currentUser);
  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white">
          content here
        </Card>
      </GridItemSix>
      <GridItemThree>right side</GridItemThree>
    </GridLayout>
  );
};

export default MyProjectsPage;
