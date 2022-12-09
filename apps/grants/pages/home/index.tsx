import {
  AppPublicLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  SEO,
} from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../_app";

const navItems = [
  {
    title: "Discover Grants",
    href: "/grants",
    bgColor: "rgba(255, 242, 104, 0.3",
    description: "Find a grant and apply for it!",
  },
  {
    title: "Find Projects",
    href: "/test/hackathon",
    bgColor: "rgba(155, 242, 104, 0.3",
    description: "Find a project and apply for it!",
  },
  {
    title: "Find Users",
    href: "/test/user",
    bgColor: "rgba(255, 142, 104, 0.3",
    description:
      "Find Members of Eden to collaborate create projects and apply for grants",
  },
];

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <SEO />
      <GridLayout className={`bg-background h-screen`}>
        <GridItemTwo> </GridItemTwo>
        <GridItemEight>
          <Card
            shadow
            className={`h-85 scrollbar-hide m-auto flex flex-col overflow-scroll bg-white py-8`}
          >
            {navItems.map((item, index: number) => (
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
        </GridItemEight>
        <GridItemTwo> </GridItemTwo>
      </GridLayout>
    </>
  );
};

HomePage.getLayout = (page) => <AppPublicLayout>{page}</AppPublicLayout>;

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
