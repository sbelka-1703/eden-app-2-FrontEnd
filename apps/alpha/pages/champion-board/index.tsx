import { AppUserSubmenuLayout, ProjectChampionList } from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const ProjectPage: NextPageWithLayout = () => <ProjectChampionList />;

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
