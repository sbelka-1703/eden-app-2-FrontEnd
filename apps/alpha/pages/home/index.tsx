import { UserContext } from "@eden/package-context";
import { AppUserSubmenuLayout, Card, MemberGraph, SEO } from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <HomeHeroSection
        grantsPage
        projectsPage
        usersPage
        // launchPage
        profilePage
      />
    </>
  );
};

interface INavItems {
  title: string;
  href: string;
  bgColor: string;
  description: string;
  display: boolean | undefined;
  style: string;
}

interface IHomeHeroSectionProps {
  opportunityPage?: boolean;
  launchPage?: boolean;
  grantsPage?: boolean;
  projectsPage?: boolean;
  usersPage?: boolean;
  profilePage?: boolean;
}

const HomeHeroSection = ({
  opportunityPage,
  launchPage,
  grantsPage,
  projectsPage,
  usersPage,
  profilePage,
}: IHomeHeroSectionProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [displayNav, setDisplayNav] = useState<INavItems[]>([]);

  console.log("currentUser = ", currentUser);

  useEffect(() => {
    const navItems = [
      {
        title: "Find Talent",
        href: "/discover",
        bgColor: "rgba(116, 250, 109, 0.3)",
        description:
          "Find Members of Eden to collaborate, create projects, and apply for grants!",
        display: usersPage,
        style: "absolute left-8 top-24",
      },
      {
        title: "Find Opportunity",
        href: "/projects",
        bgColor: "rgba(155, 103, 255, 0.3)",
        description: "Find a project, and apply for it!",
        display: projectsPage,
        style: "absolute left-8 bottom-8",
      },
      {
        title: "Add Skills",
        href: "/profile",
        bgColor: "rgba(255, 242, 104, 0.3)",
        description:
          "Finish your profile to get discovered by people in your community!",
        display: profilePage,
        style: "absolute right-8 top-24",
      },
      {
        title: "Launch new Project",
        href: "/create-project",
        bgColor: "rgba(116, 250, 109, 0.3)",
        description:
          "Become a Champion of your own adventure! + gather a team of your dreams :)",
        display: launchPage,
        style: "",
      },
      {
        title: "Launch Opportunity",
        href: "/grants",
        bgColor: "rgb(255,211,235)",
        description: "Find a grant and apply for it!",
        display: grantsPage,
        style: "absolute right-8 bottom-8",
      },
    ];
    const showNavItems = navItems.filter((item) => item.display);

    setDisplayNav(showNavItems);
  }, [
    opportunityPage,
    launchPage,
    grantsPage,
    projectsPage,
    usersPage,
    profilePage,
  ]);

  // <MemberGraph memberId={"250828754665716323"} graphType={"KG_AI"} />

  return (
    // <div className="flex h-screen w-screen items-center justify-center bg-gray-100 py-24 px-36">
    //   <Card
    //     shadow
    //     className="scrollbar-hide m-0 flex h-full w-full flex-col items-center justify-center overflow-scroll bg-white p-8"
    //   >
    //     <h1 className="mb-8 text-center text-2xl">
    //       {`Now, let's get you connected to the graph!`}
    //     </h1>
    //     <div className="flex h-full w-full items-center">
    //       {/* {currentUser?._id && <MemberGraph memberId={currentUser?._id!} />} */}
    //       <MemberGraph memberId={"250828754665716323"} graphType={"KG_AI"} />
    //     </div>
    //     {displayNav.map((item, index: number) => (
    //       // eslint-disable-next-line react/jsx-key
    //       <div className="flex justify-center p-14">
    //         <button
    //           key={index}
    //           onClick={() => router.push(`${item?.href}`)}
    //           style={{ backgroundColor: item.bgColor }}
    //           className={`rounded-full p-4 shadow-md hover:shadow-sm ${item.style} mx-4`}
    //         >
    //           <Card className="px-8 py-4">
    //             <div className="font-Inter text-center text-xl font-medium md:text-3xl">
    //               {item.title}
    //               <div className="ml-8 flex flex-col justify-between"></div>
    //             </div>
    //           </Card>
    //         </button>
    //       </div>
    //     ))}
    //   </Card>
    // </div>

    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 py-24 px-56">
      <Card
        shadow
        // className="h-auto max-w-6xl max-h-[90%] scrollbar-hide m-0 flex flex-col items-center justify-center overflow-scroll bg-white p-8 shadow-lg"
        className="scrollbar-hide m-0 flex h-full w-full flex-col items-center justify-center overflow-scroll bg-white p-8"
      >
        <h1 className="mb-8 text-center text-2xl">
          {`Now, let's get you connected to the graph!`}
        </h1>
        <div className="flex h-full w-full items-center">
          {/* {currentUser?._id && (
            <MemberGraph memberId={currentUser?._id!} graphType={"KG_AI2"} />
          )} */}
          <MemberGraph memberId={"723655233626971206"} graphType={"KG_AI2"} />
        </div>
        {displayNav.map((item, index: number) => (
          <button
            key={index}
            onClick={() => router.push(`${item?.href}`)}
            style={{ backgroundColor: item.bgColor }}
            className={`rounded-full p-4 shadow-md hover:shadow-sm ${item.style}`}
          >
            <Card className="px-8 py-4">
              <div className="font-Inter text-center text-xl font-medium md:text-3xl">
                {item.title}
                <div className="ml-8 flex flex-col justify-between"></div>
              </div>
            </Card>
          </button>
        ))}
      </Card>
    </div>
    // <Card
    //   shadow
    //   className="scrollbar-hide m-0 flex h-screen w-screen flex-col items-center justify-center overflow-scroll bg-white p-8"
    // >
    //   <h1 className="mb-8 text-center text-2xl">
    //     {`Now, let's get you connected to the graph!`}
    //   </h1>
    //   <div className="flex h-full w-full items-center">
    //     {currentUser?._id && (
    //       <MemberGraph memberId={"250828754665716323"} graphType={"KG_AI"} />
    //     )}
    //   </div>
    //   {displayNav.map((item, index: number) => (
    //     <button
    //       key={index}
    //       onClick={() => router.push(`${item?.href}`)}
    //       style={{ backgroundColor: item.bgColor }}
    //       className={`rounded-full p-4 shadow-md hover:shadow-sm ${item.style}`}
    //     >
    //       <Card className="px-8 py-4">
    //         <div className="font-Inter text-center text-xl font-medium md:text-3xl">
    //           {item.title}
    //           <div className="ml-8 flex flex-col justify-between"></div>
    //         </div>
    //       </Card>
    //     </button>
    //   ))}
    // </Card>

    // <Card
    //   shadow
    //   className={`h-85 scrollbar-hide m-auto flex w-1/2 min-w-[720px] flex-col overflow-scroll bg-white py-8`}
    // >
    //   <h1 className="text-center text-2xl">{`Now, let's get you connected to the graph!`}</h1>
    //   <div className="flex h-full w-full items-center">
    //     {currentUser?._id && <MemberGraph memberId={currentUser?._id!} />}
    //   </div>
    //   {displayNav.map((item, index: number) => (
    //     <button
    //       key={index}
    //       onClick={() => router.push(`${item?.href}`)}
    //       style={{ backgroundColor: item.bgColor }}
    //       className={`rounded-xl shadow-md hover:shadow-sm ${item.style}`}
    //     >
    //       <Card className={`px-6`}>
    //         <div
    //           className={`font-Inter text-center text-xl font-medium md:text-3xl`}
    //         >
    //           {item.title}

    //           <div className="ml-8 flex flex-col justify-between"></div>
    //         </div>
    //       </Card>
    //     </button>
    //   ))}
    // </Card>
  );
};

HomePage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default HomePage;

import { IncomingMessage, ServerResponse } from "http";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
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
