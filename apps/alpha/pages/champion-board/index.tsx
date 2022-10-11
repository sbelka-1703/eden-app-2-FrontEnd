import {
  AppUserSubmenuLayout,
  Card,
  ProjectChampionList,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const ProjectPage: NextPageWithLayout = () => (
  <Card shadow className="bg-white p-6">
    <div className={`mb-4 text-2xl font-medium text-black/80`}>
      List of Champion Projects
    </div>
    <div className="grid gap-8 lg:grid-cols-2">
      <ProjectChampionList />
    </div>
  </Card>
);

ProjectPage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

export default ProjectPage;

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
