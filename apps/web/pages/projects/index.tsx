import { useQuery } from "@apollo/client";
import { FIND_PROJECTS } from "@graphql/eden";
import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, TabsCard } from "ui";

// TODO: after getting user conext in place, add findProjects_RecommendedToUser query

const tabs = [
  {
    title: "All projects",
    fullTitle: "All projects",
  },
  {
    title: "Favourites",
    fullTitle: "Favourites",
  },
  {
    title: "Recommended",
    fullTitle: "Recommended",
  },
];

const ProjectsPage: NextPage = () => {
  const { data: dataProjects } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  console.log("dataProjects", dataProjects);
  return (
    <GridLayout>
      <GridItemThree>user profile</GridItemThree>
      <GridItemSix>
        <TabsCard tabs={tabs} onSelect={(val) => console.log(val)} />
      </GridItemSix>
      <GridItemThree>recommend</GridItemThree>
    </GridLayout>
  );
};

export default ProjectsPage;
