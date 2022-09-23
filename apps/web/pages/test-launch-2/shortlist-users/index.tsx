import {
  LaunchProjectContext,
  LaunchProjectModal,
  LaunchProjectProvider,
  ProjectActionKind,
} from "@context/eden";
import {
  AppUserLayout,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  RoleModal,
  ShortlistContainer,
  ShortlistMemberContainer,
  ShortlistSideContainer,
  SkillsModal,
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
          {JSON.stringify(project)}
          {project && <ShortlistSideContainer />}
        </GridItemThree>

        {!selectedMemberId ? (
          <GridItemNine className="hide-scrollbar h-8/10 overflow-scroll">
            <ShortlistContainer />
          </GridItemNine>
        ) : (
          <GridItemSix className="hide-scrollbar h-8/10 overflow-scroll">
            <ShortlistMemberContainer />
          </GridItemSix>
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

import {
  Maybe,
  RoleTemplate,
  RoleType,
  SkillRoleType,
  Skills,
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
