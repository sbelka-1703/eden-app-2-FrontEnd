import { LaunchProjectProvider } from "@eden/package-context";
import {
  AppUserSubmenuLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  // LaunchProjectContainer,
  SEO,
  UserProfileCard,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const LaunchPage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree>
          <UserProfileCard />
        </GridItemThree>
        <GridItemNine>{/* <LaunchProjectContainer /> */}</GridItemNine>
      </GridLayout>
    </>
  );
};

LaunchPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>
    <LaunchProjectProvider>{page}</LaunchProjectProvider>
  </AppUserSubmenuLayout>
);

export default LaunchPage;

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
