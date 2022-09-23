import {
  LaunchProjectContext,
  LaunchProjectModal,
  LaunchProjectProvider,
  ProjectActionKind,
} from "@context/eden";
import {
  AppUserLayout,
  CandidateProfileCard,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  RoleModal,
  ShortlistContainer,
  ShortlistMemberContainer,
  ShortlistSideContainer,
  SkillsModal,
  TextHeading3,
  TextLabel,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const {
    project,
    dispatchProject,
    selectedRole,
    selectedMemberId,
    setSelectedRole,
    openModal,
    setOpenModal,
  } = useContext(LaunchProjectContext);

  const { data: matchingMembers } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectedRole?.skills?.flatMap(
          (skill) => skill?.skillData?._id
        ),
      },
    },
    skip: !selectedRole,
    context: { serviceName: "soilservice" },
  });

  const filteredMembers: Members[] =
    matchingMembers?.matchSkillsToMembers?.filter(
      (member: Members) =>
        !project?.team?.some(
          (teamMember) => teamMember?.memberInfo?._id === member?._id
        )
    ) || [];

  const handleAddRole = (role: Maybe<RoleTemplate>) => {
    if (role) {
      const mappedRole = {
        title: role.title,
        _id: project?.role?.length.toString(),
        skills: role.skills?.map((skill: Maybe<Skills>) => ({
          skillData: {
            _id: skill?._id,
            name: skill?.name,
          },
        })) as SkillRoleType[],
      } as RoleType;

      dispatchProject!({
        payload: mappedRole,
        type: ProjectActionKind.ADD_ROLE,
      });
      setOpenModal(null);
    }
  };

  return (
    <>
      <GridLayout>
        <GridItemThree className="h-8/10 scrollbar-hide overflow-scroll">
          {project && (
            <ShortlistSideContainer matchingMembers={filteredMembers} />
          )}
        </GridItemThree>

        {!selectedMemberId ? (
          <GridItemNine className="hide-scrollbar h-8/10 overflow-scroll">
            <ShortlistContainer matchingMembers={filteredMembers} />
          </GridItemNine>
        ) : (
          <>
            <GridItemSix className="hide-scrollbar h-8/10 overflow-scroll">
              <ShortlistMemberContainer />
            </GridItemSix>
            <GridItemThree>
              <div className="mb-3 text-center">
                <TextLabel>Shortlisted for:</TextLabel>
                <TextHeading3>{selectedRole?.title}</TextHeading3>
              </div>
              {project?.team
                ?.filter((member) => member?.phase === null)
                ?.filter((member) => member?.roleID === selectedRole?._id)
                .map((member: Maybe<TeamType>, index) => (
                  <div key={index} className="mb-2">
                    <CandidateProfileCard
                      member={member?.memberInfo}
                      percentage={undefined}
                    />
                  </div>
                ))}
            </GridItemThree>
          </>
        )}
      </GridLayout>
      {openModal === LaunchProjectModal.ROLE && (
        <RoleModal
          openModal={openModal === LaunchProjectModal.ROLE}
          onSubmit={handleAddRole}
        />
      )}
      {openModal === LaunchProjectModal.SKILLS && (
        <SkillsModal
          isOpen={openModal === LaunchProjectModal.SKILLS}
          skills={selectedRole?.skills || []}
          setSkills={function (skills: SkillRoleType[]): void {
            dispatchProject!({
              type: ProjectActionKind.SET_ROLE_SKILLS,
              payload: {
                ...selectedRole,
                skills: skills,
              },
            });
            setSelectedRole({ ...selectedRole, skills: skills });
          }}
          handelAddSkills={() => setOpenModal(null)}
        />
      )}
    </>
  );
};

LaunchPage.getLayout = (page) => (
  <AppUserLayout>
    <LaunchProjectProvider>{page}</LaunchProjectProvider>
  </AppUserLayout>
);

export default LaunchPage;

import { useQuery } from "@apollo/client";
import { MATCH_MEMBERS_TO_SKILLS } from "@graphql/eden";
import {
  Maybe,
  Members,
  RoleTemplate,
  RoleType,
  SkillRoleType,
  Skills,
  TeamType,
} from "@graphql/eden/generated";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";
import { useContext } from "react";

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
