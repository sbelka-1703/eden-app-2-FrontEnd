import { AppUserSubmenuLayout, Card, SEO } from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../_app";

const navItems = [
  {
    title: "Discover Opportunities",
    href: "/signup",
    bgColor: "rgba(255, 242, 104, 0.3",
    description:
      "Find a project, team, gig or an opportunity to learn, earn &  grow!",
  },
  // {
  //   title: "Discover Talent",
  //   href: "/discover",
  //   bgColor: "rgba(155, 103, 255, 0.3)",
  //   description:
  //     "Find people in your community to make friends, collaborate or ask for an advise!",
  // },
  {
    title: "Launch new Project",
    href: "/launch",
    bgColor: "rgba(116, 250, 109, 0.3)",
    description:
      "Become a Champion of your own adventure! + gather a team of your dreams :)",
  },
];

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <SEO />
      <Card
        className={`h-85 scrollbar-hide m-auto flex flex-col overflow-scroll bg-white py-8`}
      >
        {navItems.map((item, index) => (
          <div key={index} className={`group my-8 grid grid-cols-3 `}>
            <div
              className={`font-Gloria text-md p-4 text-zinc-400 md:text-2xl`}
            >
              {index % 2 === 0 && (
                <span className={`group-hover:text-blue-500`}>
                  {item.description}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push(`${item?.href}`)}
              style={{ backgroundColor: item.bgColor }}
              className={`rounded-xl shadow-md hover:shadow-sm`}
            >
              <Card className={`px-6`}>
                <div
                  className={`font-Inter text-center text-xl font-medium md:text-3xl`}
                >
                  {item.title}

                  <div className="ml-8 flex flex-col justify-between"></div>
                </div>
              </Card>
            </button>
            <div
              className={`font-Gloria text-md py-4 px-8 text-zinc-400 md:text-2xl`}
            >
              {index % 2 !== 0 && (
                <span className={`group-hover:text-blue-500`}>
                  {item.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

HomePage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

export default HomePage;

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
