import { UserContext } from "@context/eden";
import { useContext } from "react";
import { AppUserMenuLayout, Card, ProjectList } from "ui";

import type { NextPageWithLayout } from "../_app";

const ApplicationsPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  const engagedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "engaged"
  );

  // console.log("engagedProjects", engagedProjects);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-2xl font-medium text-black/80`}>
        Magic Application List
        <span
          className={`ml-2 inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-sm font-medium `}
          style={{ background: "rgba(186, 213, 240, 0.31)" }}
        >
          {engagedProjects?.length}
        </span>
      </div>
      <ProjectList projects={engagedProjects} />
    </Card>
  );
};

ApplicationsPage.getLayout = (page) => (
  <AppUserMenuLayout>{page}</AppUserMenuLayout>
);

export default ApplicationsPage;

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
