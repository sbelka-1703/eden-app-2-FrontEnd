import { useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  Button,
  ChampionContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SideNavProjectList,
} from "ui";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [selectProject, setSelectProject] = useState("");

  // if (currentUser) console.log("currentUser", currentUser);

  const { data: dataProject } = useQuery(FIND_PROJECT, {
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
        <ChampionContainer project={dataProject?.findProject} />
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

export default ProjectPage;
