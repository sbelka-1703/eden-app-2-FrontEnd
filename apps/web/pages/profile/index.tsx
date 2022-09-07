import { AppUserMenuLayout, ProfileContainer } from "ui";

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  return <ProfileContainer />;
};

ProfilePage.getLayout = (page) => <AppUserMenuLayout>{page}</AppUserMenuLayout>;

export default ProfilePage;

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
