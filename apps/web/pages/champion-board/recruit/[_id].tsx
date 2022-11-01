/* eslint-disable no-unused-vars */
import { useQuery } from "@apollo/client";
import {
  FIND_MEMBER,
  FIND_PROJECT,
  MATCH_MEMBERS_TO_SKILLS,
} from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  ChampionMatchContainer,
  GridItemNine,
  GridItemThree,
  GridLayout,
  ProfileModal,
  ProjectEditSelectorCard,
  SEO,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;
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

  const [selectedRole, setSelectedRole] = useState(
    dataProject?.findProject?.role[0]
  );

  const [selectMember, setSelectMember] = useState<Maybe<Members>>(null);
  const [selecMemberMatch, setSelectMemberMatch] = useState<string>("");
  const [modalType, setModalType] = useState("New Match");

  const { data: dataMember, refetch: refetchMember } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: selectMember,
      },
    },
    skip: !selectMember,
    context: { serviceName: "soilservice" },
  });

  const { data: matchingMembers } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectedRole?.skills?.flatMap(
          (skill: any) => skill?.skillData?._id
        ),
        hoursPerWeek: null,
        // page: matchMembersPage,
        // limit: 9,
      },
    },
    skip: !selectedRole,
    context: { serviceName: "soilservice" },
  });

  // useEffect(() => {
  //   if (selectedRole) {
  //     const skills = selectedRole?.skills?.flatMap(
  //       (skill: any) => skill?.skillData?._id
  //     );

  //     console.log(skills);
  //   }
  // }, [selectedRole]);

  // project data with shortlist
  if (!dataProject) {
    return null;
  }
  // if (matchingMembers) console.log("matchingMembers", matchingMembers);

  // if (selectedRole) console.log("selectRole", selectedRole);

  return (
    <>
      {/* {selectMember && dataMember?.findMember && (
        <ProfileModal
          openModal={!!selectMember}
          member={dataMember.findMember}
          project={dataProject?.findProject}
          memberMatch={selecMemberMatch}
          onClose={() => setSelectMember(null)}
        />
      )} */}
      <SEO />
      <GridLayout>
        <GridItemThree>
          <ProjectEditSelectorCard
            project={dataProject?.findProject}
            handleSelectRole={(role) => {
              setSelectedRole(role);
            }}
            selectedRole={selectedRole}
            onBack={() => router.back()}
            onEdit={() => console.log("edit Project")}
          />
        </GridItemThree>
        <GridItemNine>
          <ChampionMatchContainer
            selectedRole={selectedRole}
            onSelectMember={setSelectMember}
            onSelectMemberMatch={setSelectMemberMatch}
            onSelectedTab={(tab) => setModalType(tab)}
            project={dataProject.findProject}
            matchingMembers={matchingMembers?.matchSkillsToMembers}
          />
        </GridItemNine>
      </GridLayout>
    </>
  );
};

ProjectPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default ProjectPage;

import { Maybe, Members } from "@eden/package-graphql/generated";
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
