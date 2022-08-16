// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS, FIND_SKILLS } from "@graphql/eden";
import type { NextPage } from "next";
import { GridItemNine, GridItemThree, GridLayout } from "ui";

const TestPage2: NextPage = () => {
  // const { data: dataMembers } = useQuery(FIND_MEMBERS, {
  //   variables: {
  //     fields: {},
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  // const { data: dataSkills } = useQuery(FIND_SKILLS, {
  //   variables: {
  //     fields: {},
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  // console.log("dataMembers", dataMembers);
  // console.log("dataSkills", dataSkills);
  return (
    <GridLayout>
      <GridItemThree>3</GridItemThree>
      <GridItemNine>9</GridItemNine>
    </GridLayout>
  );
};

export default TestPage2;
