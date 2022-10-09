import { AppUserSubmenuLayout, ProfileContainer } from "@eden/package-ui";
import { useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const submenu = [
    {
      Icon: <FaUserAlt size={20} />,
      FunctionName: "My Profile",
      onFunctionCallback: () => setActiveIndex(0),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "Edit Profile",
      onFunctionCallback: () => setActiveIndex(1),
    },
  ];

  return (
    <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
      {activeIndex === 0 && <ProfileContainer />}
      {activeIndex === 1 && <div>edit user container here</div>}
    </AppUserSubmenuLayout>
  );
};

export default ProfilePage;

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
