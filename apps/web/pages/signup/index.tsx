import { SignUpProvider } from "@context/eden";
import type { NextPage } from "next";
import Head from "next/head";
import { GridItemSix, GridItemThree, GridLayout, SignUpContainer } from "ui";

const SignUpPage: NextPage = () => {
  return (
    <div className={`bg-background`}>
      <Head>
        <title>Eden protocol</title>
      </Head>

      <SignUpProvider>
        <GridLayout>
          <GridItemThree> </GridItemThree>
          <GridItemSix>
            <SignUpContainer />
          </GridItemSix>
          <GridItemThree> </GridItemThree>
        </GridLayout>
      </SignUpProvider>
    </div>
  );
};

export default SignUpPage;

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
