import { LaunchProvider } from "@context/eden";
import {
  AppUserLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  LaunchProjectContainer,
  UserProfileMenu,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  return (
    <LaunchProvider>
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
    </LaunchProvider>
  );
};

LaunchPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

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
