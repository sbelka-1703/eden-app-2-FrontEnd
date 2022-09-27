import { useQuery } from "@apollo/client";
import {
  FIND_MEMBER,
  FIND_PROJECT,
  FIND_ROLE_TEMPLATES,
  MATCH_MEMBERS_TO_SKILLS,
} from "@graphql/eden";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AppUserLayout,
  CandidateSelectionList,
  ChampionRecruitContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
  ShortlistList,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [selectMember, setSelectMember] = useState("");
  const [selectRole, setSelectSkills] = useState<string[]>([]);

  const { data: dataMember, refetch: refetchMember } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: selectMember,
      },
    },
    skip: !selectMember,
    context: { serviceName: "soilservice" },
  });

  // member data
  // if (dataMember) console.log("dataMember", dataMember);

  const { data: dataProject, refetch: refetchProject } = useQuery(
    FIND_PROJECT,
    {
      variables: {
        fields: {
          _id,
        },
      },
      skip: !_id,
      context: { serviceName: "soilservice" },
    }
  );

  // project data with shortlist
  // if (dataProject) console.log("dataProject", dataProject.findProject);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // role titles
  // console.log("dataSkills", dataRoles);

  // TODO: when backend creates matchMembersToRole, change this query to matchMembersToRole

  const { data: dataMemberWithSkills } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectRole,
      },
    },
    skip: !selectRole || selectRole.length === 0,
    context: { serviceName: "soilservice" },
  });

  // if (dataMemberWithSkills)
  //   console.log(
  //     "dataMemberWithSkills",
  //     dataMemberWithSkills.matchMembersToSkills
  //   );

  // if (selectRole) console.log("selectRole", selectRole);

  return (
    <GridLayout>
      <GridItemThree>
        <CandidateSelectionList
          roles={dataRoles?.findRoleTemplates}
          members={dataMemberWithSkills?.matchMembersToSkills}
          onSelectRole={(selectRole) => setSelectSkills(selectRole)}
          onSelectMember={(selectMember) => setSelectMember(selectMember)}
          selectMember={selectMember}
        />
      </GridItemThree>
      <GridItemSix>
        <ChampionRecruitContainer
          project={dataProject?.findProject}
          member={dataMember?.findMember}
          refetchMember={refetchMember}
          refetchProject={refetchProject}
        />
      </GridItemSix>
      <GridItemThree>
        <ShortlistList
          project={dataProject?.findProject}
          selectMember={selectMember}
          onSelectMember={(selectMember) => setSelectMember(selectMember)}
        />
      </GridItemThree>
    </GridLayout>
  );
};

ProjectPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default ProjectPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
