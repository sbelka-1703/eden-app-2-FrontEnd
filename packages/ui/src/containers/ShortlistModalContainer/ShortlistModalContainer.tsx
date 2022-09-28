import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@context/eden";
import {
  Maybe,
  RoleTemplate,
  RoleType,
  SkillRoleType,
  Skills,
} from "@graphql/eden/generated";
import { useContext } from "react";
import {
  CongratulationsModal,
  RoleModal,
  SkillsModal,
  SocialMediaModel,
} from "ui";

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
        <SocialMediaModel
          showModal
          onSubmit={(val: any) => {
            dispatchProject!({
              type: ProjectActionKind.SET_EXTRA_DATA,
              payload: {
                bio: val.bio,
                description: val.description,
                links: val.links,
              },
            });
          }}
        />
      )}
      {openModal === LaunchProjectModal.CONGRATULATIONS && (
        <CongratulationsModal openModal />
      )}
    </>
  );
};
