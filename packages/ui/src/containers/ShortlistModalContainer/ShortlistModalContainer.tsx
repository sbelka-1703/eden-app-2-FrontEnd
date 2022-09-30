import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@eden/package-context";
import {
  Maybe,
  RoleTemplate,
  RoleType,
  SkillRoleType,
  Skills,
} from "@eden/package-graphql/generated";
import {
  CongratulationsModal,
  ProjectInfoModal,
  RoleModal,
  SkillsModal,
} from "@eden/package-ui";
import { useContext } from "react";

export interface IShortlistModalContainerProps {}

export const ShortlistModalContainer = ({}: IShortlistModalContainerProps) => {
  const {
    project,
    dispatchProject,
    openModal,
    selectedRole,
    setSelectedRole,
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
      setSelectedRole(mappedRole);
    }
  };

  return (
    <>
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
      {openModal === LaunchProjectModal.PROJECT_INFO && (
        <ProjectInfoModal
          openModal
          onSubmit={() => {
            /**/
          }}
        />
      )}
      {openModal === LaunchProjectModal.CONGRATULATIONS && (
        <CongratulationsModal openModal />
      )}
    </>
  );
};
