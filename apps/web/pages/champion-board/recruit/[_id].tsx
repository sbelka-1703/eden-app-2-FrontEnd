import { useQuery } from "@apollo/client";
import {
  FIND_MEMBER,
  FIND_PROJECT,
  FIND_ROLE_TEMPLATES,
  MATCH_MEMBERS_TO_SKILLS,
} from "@graphql/eden";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  CandidateSelectionList,
  ChampionRecruitContainer,
  GridItemSix,
  GridItemThree,
  GridLayout,
} from "ui";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [selectMember, setSelectMember] = useState<string | null>(null);
  const [selectRole, setSelectSkills] = useState<string[]>([]);

  const { data: dataMember } = useQuery(FIND_MEMBER, {
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

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
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
  // console.log("dataSkills", dataRoles);

  // TODO: when backend creates matchMembersToRole, change this query to matchMembersToRole

  const { data: dataMemberWithSkills } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectRole,
      },
    },
    skip: !selectRole,
    context: { serviceName: "soilservice" },
  });

  // if (dataMemberWithSkills)
  //   console.log(
  //     "dataMemberWithSkills",
  //     dataMemberWithSkills.matchMembersToSkills
  //   );

  return (
    <GridLayout>
      <GridItemThree>
        <CandidateSelectionList
          roles={dataRoles?.findRoleTemplates}
          members={dataMemberWithSkills?.matchMembersToSkills}
          onSelectRole={(selectRole) => setSelectSkills(selectRole)}
          onSelectMember={(selectMember) => setSelectMember(selectMember)}
        />
      </GridItemThree>
      <GridItemSix>
        <ChampionRecruitContainer member={dataMember?.findMember} />
      </GridItemSix>
      <GridItemThree>shortlist</GridItemThree>
    </GridLayout>
  );
};

export default ProjectPage;
