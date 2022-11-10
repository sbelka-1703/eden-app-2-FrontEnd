import { LoginSection, SEO } from "@eden/package-ui";
import type { NextPage } from "next";

import wave from "../../public/wave.gif";

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO title={``} />
      <LoginSection image={wave.src} />
    </>
  );
};

export default LoginPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  query: any;
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const { redirect } = ctx.query;

  let redirectUrl = "/home";

  if (redirect && redirect.startsWith("_next")) {
    redirectUrl = "/home";
  } else if (redirect) {
    redirectUrl = redirect;
  }

  if (session) {
    return {
      redirect: {
        destination: redirectUrl ? `/${redirectUrl}` : `/home`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
