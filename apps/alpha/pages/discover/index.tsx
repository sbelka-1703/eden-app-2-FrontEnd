import {
  AppUserSubmenuLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const DiscoverPage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree>
          <Card shadow className="h-85 bg-white p-6">
            left side
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card shadow className="h-85 overflow-auto bg-white p-6">
            discover page
          </Card>
        </GridItemNine>
      </GridLayout>
    </>
  );
};

DiscoverPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default DiscoverPage;

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
