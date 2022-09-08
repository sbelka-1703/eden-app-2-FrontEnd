import { UserContext } from "@context/eden";
import { useContext } from "react";
import { AppUserMenuLayout, Card, ProjectList } from "ui";

import type { NextPageWithLayout } from "../_app";

const MyProjectsPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  const committedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "committed"
  );

  // console.log("committedProjects", committedProjects);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-2xl font-medium text-black/80`}>
        My Active Projects
        <span
          className={`ml-2 inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-sm font-medium `}
          style={{ background: "rgba(186, 213, 240, 0.31)" }}
        >
          {committedProjects?.length}
        </span>
      </div>
      <ProjectList projects={committedProjects} statusButton />
    </Card>
  );
};

MyProjectsPage.getLayout = (page) => (
  <AppUserMenuLayout>{page}</AppUserMenuLayout>
);

export default MyProjectsPage;

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
