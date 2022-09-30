import { LaunchProjectProvider } from "@eden/package-context";
import {
  AppUserLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  LaunchProjectContainer,
  UserProfileMenu,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const LaunchPage: NextPageWithLayout = () => {
  return (
    <GridLayout>
      <GridItemThree>
        <Card className="bg-white p-6">
          <UserProfileMenu title={`Good Morning,`} />
        </Card>
      </GridItemThree>
      <GridItemNine>
        <LaunchProjectContainer />
      </GridItemNine>
    </GridLayout>
  );
};

LaunchPage.getLayout = (page) => (
  <AppUserLayout>
    <LaunchProjectProvider>{page}</LaunchProjectProvider>
  </AppUserLayout>
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
