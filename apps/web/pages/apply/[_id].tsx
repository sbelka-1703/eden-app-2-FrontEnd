import { gql, useMutation, useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ApplyContainer, GridItemSix, GridItemThree, GridLayout } from "ui";

import { UserContext } from "../../context";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

const ApplyPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  const { currentUser } = useContext(UserContext);

  // console.log("_id", _id);

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataProject) console.log("dataProject", dataProject.findProject);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {}
  );

  return (
    <GridLayout>
      <GridItemThree>how to apply</GridItemThree>
      <GridItemSix>
        <ApplyContainer
          project={dataProject?.findProject}
          onApply={() =>
            changeTeamMember_Phase_Project({
              variables: {
                fields: {
                  projectID: _id,
                  memberID: currentUser?._id,
                  phase: "engaged",
                },
              },
            })
          }
        />
      </GridItemSix>
      <GridItemThree>about the project</GridItemThree>
    </GridLayout>
  );
};

export default ApplyPage;
