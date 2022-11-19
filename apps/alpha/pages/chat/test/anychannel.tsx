import {
  AppUserSubmenuLayout,
  DiscordCreateGardenTeam,
  DiscordThreadChat,
  DiscordThreadForum,
  SEO,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../../_app";

const AnyChannelPage: NextPageWithLayout = () => (
  <div className={`h-85 scrollbar-hide space-y-4 overflow-scroll px-4 py-1`}>
    <DiscordThreadChat />
    <DiscordThreadForum />
    <DiscordCreateGardenTeam />
  </div>
);

AnyChannelPage.getLayout = (page) => (
  <>
    <SEO />
    <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
  </>
);

export default AnyChannelPage;

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
