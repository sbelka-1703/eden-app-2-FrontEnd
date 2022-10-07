import { UserContext } from "@eden/package-context";
import { AppUserSubmenuLayout, Card } from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

import type { NextPageWithLayout } from "../_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  const championProjects = currentUser?.projects?.filter(
    (project: any) => project.champion
  );

  console.log("championProjects", championProjects);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-2xl font-medium text-black/80`}>
        List of Champion Projects
      </div>
      <div className={`grid grid-cols-1`}>
        {championProjects?.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              router.push(`/champion-board/recruit/${item?.info?._id}`)
            }
          >
            <Card>{item?.info?.title}</Card>
          </button>
        ))}
      </div>
    </Card>
  );
};

ProjectPage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

export default ProjectPage;

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
