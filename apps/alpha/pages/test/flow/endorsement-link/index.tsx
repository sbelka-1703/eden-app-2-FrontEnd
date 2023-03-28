import {
  AppUserSubmenuLayout,
  EndorsementLinkFlow,
  SEO,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../../../_app";

const EndorsementPage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <EndorsementLinkFlow />
    </>
  );
};

EndorsementPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default EndorsementPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session || session.error === "RefreshAccessTokenError") {
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
