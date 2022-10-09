import { UserContext } from "@eden/package-context";
import { AppUserSubmenuLayout, Card } from "@eden/package-ui";
import { useContext, useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import type { NextPageWithLayout } from "../_app";

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

  const engagedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "engaged"
  );

  console.log("engagedProjects", engagedProjects);

  const committedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "committed"
  );

  console.log("committedProjects", committedProjects);

  const invitedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "invited"
  );

  console.log("invitedProjects", invitedProjects);

  const rejectedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "rejected"
  );

  console.log("invitedProjects", rejectedProjects);

  return (
    <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
      <Card shadow className="h-85 bg-white p-6">
        {activeIndex === 0 && (
          <div className={`text-2xl font-medium text-black/80`}>
            Active Projects
          </div>
        )}
        {activeIndex === 1 && (
          <div className={`text-2xl font-medium text-black/80`}>
            Active Applications
          </div>
        )}
        {activeIndex === 2 && (
          <div className={`text-2xl font-medium text-black/80`}>Invited</div>
        )}
        {activeIndex === 3 && (
          <div className={`text-2xl font-medium text-black/80`}>Rejected</div>
        )}
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
