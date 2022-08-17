import { useQuery } from "@apollo/client";
import { FIND_PROJECT, FIND_ROLE_TEMPLATES } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  CandidateSelectionList,
  GridItemSix,
  GridItemThree,
  GridLayout,
  TabsCard,
} from "ui";

const tabs = [
  {
    title: "General",
    fullTitle: "General",
  },
  {
    title: "Background",
    fullTitle: "Background",
  },
  {
    title: "Endorsements",
    fullTitle: "Endorsements",
  },
];

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

  // project data with shortlist
  console.log("dataProject", dataProject);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // role titles
  // console.log("dataSkills", dataRoles);

  // TODO: tried matchMembersToSkills but wasn't returning empty array

  return (
    <GridLayout>
      <GridItemThree>
        <CandidateSelectionList roles={dataRoles?.findRoleTemplates} />
      </GridItemThree>
      <GridItemSix>
        <TabsCard tabs={tabs} onSelect={(val) => console.log(val)} />
      </GridItemSix>
      <GridItemThree>3</GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;
