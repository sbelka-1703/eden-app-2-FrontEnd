import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useContext, useState } from "react";
import {
  ChampionContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SideNavProjectList,
} from "ui";

import { UserContext } from "../../context";

const ProjectPage: NextPage = () => {
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
      <GridItemThree> </GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;
