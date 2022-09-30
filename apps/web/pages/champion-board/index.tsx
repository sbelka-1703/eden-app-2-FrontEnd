import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_PROJECT } from "@eden/package-graphql";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  AppUserLayout,
  Button,
  ChampionContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SideNavProjectList,
} from "ui";

import type { NextPageWithLayout } from "../_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [selectProject, setSelectProject] = useState("");

  // if (currentUser) console.log("currentUser", currentUser);

  const { data: dataProject, refetch } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: selectProject,
      },
    },
    context: { serviceName: "soilservice" },
    skip: !selectProject,
  });

  // if (dataProject) console.log("dataProject", dataProject?.findProject);
  return (
    <GridLayout>
      <GridItemThree>
        <div className={`text-lg font-medium text-black/60`}>
          Hi there, champion!
        </div>
        <div className={`text-2xl font-medium text-black`}>YOUR PROJECTS</div>
        <SideNavProjectList
          projects={currentUser?.projects}
          onSelectProject={(id) => setSelectProject(id)}
        />
      </GridItemThree>
      <GridItemSix>
        <ChampionContainer
          project={dataProject?.findProject}
          refetch={refetch}
        />
      </GridItemSix>
      <GridItemThree>
        {selectProject && (
          <>
            <div className={`text-center text-lg font-medium text-black/60`}>
              Need to find more Members for your project?
            </div>
            <div className={`my-8 flex justify-center`}>
              <Button
                variant={`primary`}
                onClick={() =>
                  router.push(`/champion-board/recruit/${selectProject}`)
                }
              >
                Recruit
              </Button>
            </div>
          </>
        )}
      </GridItemThree>
    </GridLayout>
  );
};

ProjectPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

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
