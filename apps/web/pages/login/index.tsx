import { SignUpProvider } from "@context/eden";
import type { NextPage } from "next";
import Head from "next/head";
import { GridItemSix, GridItemThree, GridLayout, LoginCard } from "ui";

const LoginPage: NextPage = () => {
  return (
    <div className={`bg-background grid h-screen content-center `}>
      <Head>
        <title>Eden protocol - Login</title>
      </Head>

      <SignUpProvider>
        <GridLayout>
          <GridItemThree> </GridItemThree>
          <GridItemSix>
            <LoginCard />
          </GridItemSix>
          <GridItemThree> </GridItemThree>
        </GridLayout>
      </SignUpProvider>
    </div>
  );
};

export default LoginPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: `/projects`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
