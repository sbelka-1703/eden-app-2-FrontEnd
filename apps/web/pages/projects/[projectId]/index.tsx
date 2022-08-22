import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  UserProfileMenu,
} from "ui";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: projectId,
      },
    },
    context: { serviceName: "soilservice" },
  });

  if (dataProject) console.log("dataProject", dataProject);
  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu />
      </GridItemThree>
      <GridItemNine>
        <Card shadow className="h-8/10 bg-white">
          content here
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

export default ProjectPage;
