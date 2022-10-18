import { UserContext } from "@eden/package-context";
import { ApplicationCard, AppUserSubmenuLayout, Card } from "@eden/package-ui";
import { useContext, useState } from "react";
import {
  GrDocumentExcel,
  GrDocumentTime,
  GrDocumentUser,
} from "react-icons/gr";
import { VscFolderActive } from "react-icons/vsc";

import type { NextPageWithLayout } from "../_app";

const PHASES: { [key: number]: { type: string; title: string } } = {
  0: {
    type: "committed",
    title: "Active Projects",
  },
  1: {
    type: "engaged",
    title: "Active Applications",
  },
  2: {
    type: "invited",
    title: "Invited",
  },
  3: {
    type: "rejected",
    title: "Rejected",
  },
};

const ApplicationsPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const submenu = [
    {
      Icon: <VscFolderActive size={25} />,
      FunctionName: "Active projects",
      Counter: currentUser?.projects?.filter(
        (project: any) => project.phase === "committed"
      ).length,
      onFunctionCallback: () => setActiveIndex(0),
    },
    {
      Icon: <GrDocumentTime size={25} />,
      FunctionName: "Active applications",
      Counter: currentUser?.projects?.filter(
        (project: any) => project.phase === "engaged"
      ).length,
      onFunctionCallback: () => setActiveIndex(1),
    },
    {
      Icon: <GrDocumentUser size={25} />,
      FunctionName: "Invited",
      Counter: currentUser?.projects?.filter(
        (project: any) => project.phase === "invited"
      ).length,
      onFunctionCallback: () => setActiveIndex(2),
    },
    {
      Icon: <GrDocumentExcel size={25} />,
      FunctionName: "Rejected",
      Counter: currentUser?.projects?.filter(
        (project: any) => project.phase === "rejected"
      ).length,
      onFunctionCallback: () => setActiveIndex(3),
    },
  ];

  return (
    <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
      <Card shadow className="h-85 scrollbar-hide overflow-scroll bg-white p-6">
        <div className={`text-2xl font-medium text-black/80`}>
          {PHASES[activeIndex].title}
        </div>
        <div className="mt-4 grid gap-8 lg:grid-cols-3">
          {currentUser?.projects
            ?.filter(
              (project: any) => project.phase === PHASES[activeIndex].type
            )
            .map((project, index) => (
              <ApplicationCard
                project={project}
                key={project?.info?._id || index}
              />
            ))}
        </div>
      </Card>
    </AppUserSubmenuLayout>
  );
};

export default ApplicationsPage;

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
