import { LaunchProjectProvider } from "@context/eden";
import {
  AppUserLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  ShortlistContainer,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  return (
    <GridLayout>
      <GridItemThree className="h-8/10 scrollbar-hide overflow-scroll">
        {" "}
      </GridItemThree>

      <GridItemNine className="hide-scrollbar h-8/10 overflow-scroll">
        <ShortlistContainer />
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
