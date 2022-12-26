import { Card } from "@eden/package-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface INavItems {
  title: string;
  href: string;
  bgColor: string;
  description: string;
  display: boolean | undefined;
}

export interface IHomeHeroSectionProps {
  opportunityPage?: boolean;
  discoverPage?: boolean;
  launchPage?: boolean;
  grantsPage?: boolean;
  projectsPage?: boolean;
  usersPage?: boolean;
}

export const HomeHeroSection = ({
  opportunityPage,
  discoverPage,
  launchPage,
  grantsPage,
  projectsPage,
  usersPage,
}: IHomeHeroSectionProps) => {
  const router = useRouter();
  const [displayNav, setDisplayNav] = useState<INavItems[]>([]);

  useEffect(() => {
    const navItems = [
      {
        title: "Discover Grants",
        href: "/grants",
        bgColor: "rgba(255, 242, 104, 0.3",
        description: "Find a grant and apply for it!",
        display: grantsPage,
      },
      {
        title: "Find Projects",
        href: "/projects",
        bgColor: "rgba(155, 103, 255, 0.3)",
        description: "Find a project, and apply for it!",
        display: projectsPage,
      },
      {
        title: "Find Users",
        href: "/discover",
        bgColor: "rgba(116, 250, 109, 0.3)",
        description:
          "Find Members of Eden to collaborate, create projects, and apply for grants!",
        display: usersPage,
      },
      {
        title: "Discover Opportunities",
        href: "/signup",
        bgColor: "rgba(255, 242, 104, 0.3",
        description:
          "Find a project, team, gig or an opportunity to learn, earn &  grow!",
        display: opportunityPage,
      },
      {
        title: "Discover Talent",
        href: "/discover",
        bgColor: "rgba(155, 103, 255, 0.3)",
        description:
          "Find people in your community to make friends, collaborate or ask for an advise!",
        display: discoverPage,
      },
      {
        title: "Launch new Project",
        href: "/create-project",
        bgColor: "rgba(255, 242, 104, 0.3)",
        description:
          "Become a Champion of your own adventure! + gather a team of your dreams :)",
        display: launchPage,
      },
    ];
    const showNavItems = navItems.filter((item) => item.display);

    setDisplayNav(showNavItems);
  }, [
    opportunityPage,
    discoverPage,
    launchPage,
    grantsPage,
    projectsPage,
    usersPage,
  ]);

  return (
    <Card
      shadow
      className={`h-85 scrollbar-hide m-auto flex flex-col overflow-scroll bg-white py-8`}
    >
      {displayNav.map((item, index: number) => (
        <div key={index} className={`group my-8 grid grid-cols-3 `}>
          <div className={`font-Gloria text-md p-4 text-zinc-400 md:text-2xl`}>
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
  );
};
