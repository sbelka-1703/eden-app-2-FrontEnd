import { UserContext } from "@eden/package-context";
import { ApplicationCard, AppUserSubmenuLayout, Card } from "@eden/package-ui";
import { useContext, useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import type { NextPageWithLayout } from "../_app";

const PHASES: { [key: number]: { type: string; title: string } } = {
  0: {
    type: "engaged",
    title: "Active Projects",
  },
  1: {
    type: "committed",
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
      Icon: <FaUserAlt size={20} />,
      FunctionName: "Active projects",
      onFunctionCallback: () => setActiveIndex(0),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "Active applications",
      onFunctionCallback: () => setActiveIndex(1),
    },
    {
      Icon: <FaUserAlt size={20} />,
      FunctionName: "invited",
      onFunctionCallback: () => setActiveIndex(2),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "rejected",
      onFunctionCallback: () => setActiveIndex(3),
    },
  ];

  return (
    <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
      <Card shadow className="bg-white p-6">
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
                project={project?.info}
                key={project?.info?._id || index}
                role={project?.info?.role?.length ? project.info.role[0] : {}}
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
