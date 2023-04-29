// import { UserContext } from "@eden/package-context";
import {
  AppUserSubmenuLayout,
  Button,
  Card,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SEO,
} from "@eden/package-ui";
import Image from "next/image";

// import { useContext } from "react";
import type { NextPageWithLayout } from "../_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <HomeHeroSection />
    </>
  );
};

interface IHomeHeroSectionProps {}

const HomeHeroSection = ({}: IHomeHeroSectionProps) => {
  const router = useRouter();
  // const { currentUser } = useContext(UserContext);

  return (
    <div className="scrollbar-hide h-[calc(100vh-4rem)] w-full overflow-y-scroll bg-gray-100">
      <GridLayout>
        <GridItemThree> </GridItemThree>
        <GridItemSix className="">
          <div
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.35), 
                rgba(0, 0, 0, 0.35)
              ),url(/home-img.png)`,
              backgroundSize: "cover",
              backgroundPositionY: "37%",
            }}
            className="shadow-cardShadow flex h-[180px] w-full items-center justify-center rounded-2xl pb-7"
          >
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Welcome to Eden!
            </h1>
          </div>
          <Card shadow className=" mb-2 -mt-8 w-full bg-white px-8 py-6">
            <section className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium">
                  Boost your freelance career!
                </h3>
                <p className="text-slate-600">
                  Start by creating your profile
                  <br /> and adding some skills
                </p>
              </div>
              <Button
                variant="primary"
                className="flex items-center"
                onClick={() => router.push("/profile")}
              >
                Edit my profile
                <FiArrowRight className="ml-2" />
              </Button>
            </section>
          </Card>
          <Card
            shadow
            // className="h-auto max-w-6xl max-h-[90%]  m-0 flex flex-col items-center justify-center bg-white px-8 py-6 shadow-lg"
            className=" mb-2 w-full bg-white px-8 py-6"
          >
            <section className="grid grid-cols-6">
              <div className="col-span-2 -ml-8 flex items-center justify-center">
                <Image src={"eden-logo.svg"} alt="" width={124} height={124} />
              </div>
              <div className="col-span-4">
                <h3 className="font-medium">
                  Forget about recruitment interviews!
                </h3>
                <p className="text-slate-600">
                  We will use Eden AI to match you with the best job
                  opportunities.
                  <br />
                  <br />
                  Once you get a match we’ll contact you via Discord
                </p>
                <p className="mt-6">
                  Remember to join our{` `}
                  <Link
                    target="_blank"
                    href={
                      "https://discord.com/channels/1096065477295476847/1098616696161456158"
                    }
                    className="text-[#6A5ACD] underline hover:text-[#8579d4]"
                  >
                    Discord community
                    <div className="ml-2 inline-block h-8 w-8 rounded-lg bg-[#6A5ACD] hover:bg-[#8579d4]">
                      <div className="flex h-full w-full items-center justify-center">
                        <BsDiscord color="white" size={22} />
                      </div>
                    </div>
                  </Link>
                </p>
              </div>
            </section>
          </Card>
          <Card shadow className=" w-full bg-white px-8 py-6">
            <section className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-slate-600">
                  Get your skills endorsed by other members
                </p>
              </div>
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={() => {
                  router.push("/test/flow/endorsement-link");
                }}
              >
                Ask endorsement
                <FiArrowRight className="ml-2" />
              </Button>
            </section>
            <section className="flex items-center justify-between">
              <div>
                <p className="text-slate-600">
                  You can also explore other users profiles
                </p>
              </div>
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={() => {
                  router.push("/discover");
                }}
              >
                Discover people
                <FiArrowRight className="ml-2" />
              </Button>
            </section>
          </Card>
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </div>
  );
};

HomePage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default HomePage;

import { IncomingMessage, ServerResponse } from "http";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
// import { useEffect, useState } from "react";

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
