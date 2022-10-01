import { useMutation } from "@apollo/client";
import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@eden/package-context";
import { UPDATE_PROJECT } from "@eden/package-graphql";
import {
  Maybe,
  Mutation,
  RoleTemplate,
  RoleType,
  SkillRoleType,
  Skills,
} from "@eden/package-graphql/generated";
import {
  CongratulationsModal,
  RoleDescriptionModal,
  RoleModal,
  SavingProjectModal,
  ShortlistMemberModal,
  SkillsModal,
  SocialMediaModel,
} from "@eden/package-ui";
import { useContext, useEffect } from "react";

export interface IShortlistModalContainerProps {}

export const ShortlistModalContainer = ({}: IShortlistModalContainerProps) => {
  const {
    project,
    dispatchProject,
    openModal,
    selectedRole,
    setSelectedRole,
    setOpenModal,
    submitting,
    setSubmitting,
  } = useContext(LaunchProjectContext);

  const [updateProject, {}] = useMutation(UPDATE_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
      console.log(updateProject);
    },
  });

  useEffect(() => {
    if (submitting) {
      setOpenModal(LaunchProjectModal.SAVING_PROJECT);
      updateProject({
        variables: {
          fields: {
            title: "asdadsd",
            // role: project?.role?.map((role) => ({
            //   ...role,
            //   skills: role?.skills?.map((skill) => ({
            //     _id: skill?.skillData?._id,
            //     level: skill?.level,
            //   })),
            // })),
            // team: project?.team?.map((member) => ({
            //   memberID: member?.memberInfo?._id,
            //   roleID: member?.roleID,
            //   phase: "shortlisted",
            // })),
          },
        },
        context: { serviceName: "soilservice" },
        onCompleted: () => {
          setOpenModal(LaunchProjectModal.SAVING_PROJECT);
          setSubmitting(false);
        },
      });
    }
  }, [submitting]);

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
      {openModal === LaunchProjectModal.SHORTLISTED_PREVIEW && (
        <ShortlistMemberModal
          isModalOpen={openModal === LaunchProjectModal.SHORTLISTED_PREVIEW}
          roles={project?.role || []}
          members={project?.team!}
          onClickNext={() => {
            setOpenModal(LaunchProjectModal.ROLE_DESCRIPTION);
          }}
        />
      )}
      {openModal === LaunchProjectModal.ROLE_DESCRIPTION && (
        <RoleDescriptionModal
          isModalOpen={openModal === LaunchProjectModal.ROLE_DESCRIPTION}
          roles={project?.role || []}
          handleSubmit={function (val: any): void {
            dispatchProject!({
              type: ProjectActionKind.SET_ROLES,
              payload: val,
            });
            setOpenModal(LaunchProjectModal.PROJECT_INFO);
          }}
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
            setSubmitting(true);
          }}
        />
      )}
      {openModal === LaunchProjectModal.SAVING_PROJECT && (
        <SavingProjectModal openModal />
      )}
      {openModal === LaunchProjectModal.CONGRATULATIONS && (
        <CongratulationsModal openModal />
      )}
    </>
  );
};
