import { useQuery } from "@apollo/client";
import { FIND_PROJECT, FIND_ROLE_TEMPLATES } from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  // CandidateSelectionList,
  GridItemSix,
  GridItemThree,
  GridLayout,
} from "ui";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
  });

  // project data with shortlist
  if (dataProject) console.log("dataProject", dataProject.findProject);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // role titles
  if (dataRoles) console.log("dataSkills", dataRoles);

  // TODO: tried matchMembersToSkills but wasn't returning empty array

  return (
    <GridLayout>
      <GridItemThree>
        3{/* <CandidateSelectionList roles={dataRoles?.findRoleTemplates} /> */}
      </GridItemThree>
      <GridItemSix>6</GridItemSix>
      <GridItemThree>3</GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
