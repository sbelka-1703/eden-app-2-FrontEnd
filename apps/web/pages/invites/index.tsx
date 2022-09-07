import { UserContext } from "@context/eden";
import { useContext } from "react";
import { AppUserMenuLayout, Card, ProjectList } from "ui";

import type { NextPageWithLayout } from "../_app";

const InvitePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  const invitedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "invited"
  );

  // console.log("engagedProjects", engagedProjects);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-2xl font-medium text-black/80`}>My Invites</div>
      <ProjectList projects={invitedProjects} />
    </Card>
  );
};

InvitePage.getLayout = (page) => <AppUserMenuLayout>{page}</AppUserMenuLayout>;

export default InvitePage;

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
