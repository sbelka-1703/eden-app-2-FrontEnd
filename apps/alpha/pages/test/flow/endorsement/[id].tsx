import { AppUserSubmenuLayout, EndorsementFlow, SEO } from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../../../_app";

const EndorsementPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("endorsement page ID ===>", id);

  return (
    <>
      <SEO />
      <EndorsementFlow />
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
