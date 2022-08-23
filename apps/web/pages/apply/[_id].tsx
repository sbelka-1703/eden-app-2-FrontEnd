import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Card, GridItemSix, GridItemThree, GridLayout } from "ui";

const ApplyPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  console.log("_id", _id);

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    context: { serviceName: "soilservice" },
  });

  if (dataProject) console.log("dataProject", dataProject);
  return (
    <GridLayout>
      <GridItemThree>how to apply</GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white">
          Magic Application
        </Card>
      </GridItemSix>
      <GridItemThree>about the project</GridItemThree>
    </GridLayout>
  );
};

export default ApplyPage;
