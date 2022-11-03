import {
  AppUserSubmenuLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  // SEO,
} from "@eden/package-ui";
import Head from "next/head";

import type { NextPageWithLayout } from "../../_app";

const DiscoverPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta name="og:title" content="Vercel Edge Network" />
        <meta name="og:description" content="Vercel Edge Network" />
        <meta
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `${
              process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
            }/api/og/tailwind`
          }
        />
      </Head>
      {/* <SEO /> */}
      <GridLayout>
        <GridItemThree>
          <Card shadow className="h-85 bg-white p-6">
            left side
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card shadow className="h-85 overflow-auto bg-white p-6">
            discover page tailwind
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
