// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS } from "@graphql/eden";
import type { NextPage } from "next";
import { ChampionContainer, GridItemSix, GridItemThree, GridLayout } from "ui";

// TODO: commented out to get a basic query in place.  Talk to backend about a query for projects by member that they champion.

const ProjectPage: NextPage = () => {
  // const { data: dataMembers } = useQuery(FIND_MEMBERS, {
  //   variables: {
  //     fields: {},
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  // console.log("dataMembers", dataMembers);
  return (
    <GridLayout>
      <GridItemThree>Hi there, champion!</GridItemThree>
      <GridItemSix>
        <ChampionContainer />
      </GridItemSix>
      <GridItemThree> </GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;
