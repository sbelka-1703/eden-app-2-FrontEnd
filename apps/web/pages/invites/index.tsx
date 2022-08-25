// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS, FIND_SKILLS } from "@graphql/eden";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  UserProfileMenu,
} from "ui";

import { UserContext } from "../../context";

const InvitePage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemNine>
        <Card shadow className="h-8/10 bg-white p-6">
          <div className={`text-2xl font-medium text-black/80`}>My Invites</div>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

export default InvitePage;
