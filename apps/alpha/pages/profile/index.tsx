import { AppUserSubmenuLayout, ProfileContainer } from "@eden/package-ui";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  return <ProfileContainer />;
};

const submenu = [
  {
    Icon: <FaUserAlt size={20} />,
    FunctionName: "My Profile",
    onFunctionCallback: () => console.log(`change view`),
  },
  {
    Icon: <FaUserEdit size={25} />,
    FunctionName: "Edit Profile",
    onFunctionCallback: () => console.log(`change view`),
  },
];

ProfilePage.getLayout = (page) => (
  <AppUserSubmenuLayout submenu={submenu}>{page}</AppUserSubmenuLayout>
);

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
