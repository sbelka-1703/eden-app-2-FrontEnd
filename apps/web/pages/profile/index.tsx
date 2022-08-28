import { UserContext } from "@context/eden";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  GridItemNine,
  GridItemThree,
  GridLayout,
  ProfileContainer,
  UserProfileMenu,
} from "ui";

const ProfilePage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemNine>
        <ProfileContainer />
      </GridItemNine>
    </GridLayout>
  );
};

export default ProfilePage;
