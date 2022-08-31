import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ApplyContainer, GridItemSix, GridItemThree, GridLayout } from "ui";

const ApplyPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  // const { currentUser } = useContext(UserContext);

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataProject) console.log("dataProject", dataProject.findProject);

  return (
    <GridLayout>
      <GridItemThree>how to apply</GridItemThree>
      <GridItemSix>
        <ApplyContainer project={dataProject?.findProject} />
      </GridItemSix>
      <GridItemThree>about the project</GridItemThree>
    </GridLayout>
  );
};

export default ApplyPage;
