// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS } from "@graphql/eden";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  ChampionContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SideNavProjectList,
} from "ui";

import { UserContext } from "../../context";

// TODO: commented out to get a basic query in place.  Talk to backend about a query for projects by member that they champion.

const ProjectPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) console.log("currentUser", currentUser);

  // const { data: dataMembers } = useQuery(FIND_MEMBERS, {
  //   variables: {
  //     fields: {},
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  // console.log("dataMembers", dataMembers);
  return (
    <GridLayout>
      <GridItemThree>
        Hi there, champion!!!
        <SideNavProjectList projects={currentUser?.projects} />
      </GridItemThree>
      <GridItemSix>
        <ChampionContainer />
      </GridItemSix>
      <GridItemThree> </GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;
