import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { GridItemSix, GridItemThree, GridLayout } from "ui";

import wave from "../../public/wave.gif";

const LoginPage: NextPage = () => {
  return (
    <div
      className={`grid h-screen content-center `}
      style={{
        backgroundImage:
          "linear-gradient(120.91deg, #022A00 18.23%, #071B08 92.68%)",
      }}
    >
      <Head>
        <title>Eden protocol - Login</title>
      </Head>

      <GridLayout>
        <GridItemThree> </GridItemThree>
        <GridItemSix>
          <div
            className={`h-5/10 relative w-full rounded-3xl border-2 border-white p-6 shadow-lg`}
            style={{
              backgroundImage:
                "linear-gradient(143.35deg, rgba(255, 255, 255, 0.61) 6.04%, rgba(255, 255, 255, 0.28) 101.32%)",
            }}
          >
            <div
              className={`text-darkGreen mt-4 text-center text-2xl font-semibold`}
            >
              ⚡️ Signin before continuing!
            </div>
            <div className={`flex w-full justify-center`}>
              <Image src={wave} alt="discord wave" width={260} height={260} />
            </div>

            <div className={`flex w-full justify-center`}>
              <button
                className={`text-darkGreen absolute bottom-8 flex rounded-full border border-white bg-white/50 p-1.5 font-medium hover:bg-white/60`}
                onClick={() => signIn("discord")}
              >
                <span className={`rounded-full bg-blue-600 p-1`}>
                  <FaDiscord size={`1.5em`} color={`#ffffff`} />
                </span>
                <span className={`my-auto pl-2 pr-4`}>Login with Discord</span>
              </button>
            </div>
          </div>
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </div>
  );
};

export default LoginPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession, signIn } from "next-auth/react";

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
