import { UserContext } from "@eden/package-context";
import { AppUserSubmenuLayout, Card } from "@eden/package-ui";
import { useContext } from "react";

import type { NextPageWithLayout } from "../_app";

const ApplicationsPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

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
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-2xl font-medium text-black/80`}>
        Active Applications
      </div>
    </Card>
  );
};

ApplicationsPage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

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
