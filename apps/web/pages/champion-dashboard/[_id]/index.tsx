import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GridItemNine, GridItemThree, GridLayout } from "ui";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    context: { serviceName: "soilservice" },
  });

  console.log("dataProject", dataProject);
  return (
    <GridLayout>
      <GridItemThree>3</GridItemThree>
      <GridItemNine>9</GridItemNine>
    </GridLayout>
  );
};

export default ProjectPage;
