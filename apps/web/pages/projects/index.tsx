import { useQuery } from "@apollo/client";
import { FIND_PROJECTS } from "@graphql/eden";
import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, TabsCard } from "ui";

// TODO: is there a recommended projects query?

const ProjectsPage: NextPage = () => {
  const { data: dataProjects } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  console.log("dataMembers", dataProjects);
  return (
    <GridLayout>
      <GridItemThree>3</GridItemThree>
      <GridItemSix>
        <TabsCard />
      </GridItemSix>
      <GridItemThree>3</GridItemThree>
    </GridLayout>
  );
};

export default ProjectsPage;
