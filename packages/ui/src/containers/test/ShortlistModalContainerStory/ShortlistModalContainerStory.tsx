import { useMutation } from "@apollo/client";
import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@eden/package-context";
import { UPDATE_PROJECT } from "@eden/package-graphql";
import {
  // Maybe,
  Mutation,
  // RoleTemplate,
  // RoleType,
  //   SkillCategory,
  // SkillRoleType,
  // Skills,
  //   SkillSubCategory,
  UpdateProjectInput,
} from "@eden/package-graphql/generated";
import {
  CongratulationsModal,
  FindTalentModal,
  PrioritizeModal,
  RequirementsModal,
  // RoleDescriptionModal,
  // RoleModal,
  SavingProjectModal,
  // ShortlistMemberModal,
  //   SkillsCategoryModal,
  // SkillsModal,
  //   SkillsOnCategoryModal,
  //   SkillsSubcategoryModal,
  SocialMediaModel,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

// @TODO mock data to be removed

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

// -----------------

export interface IShortlistModalContainerStoryProps {}

export const ShortlistModalContainerStory =
  ({}: IShortlistModalContainerStoryProps) => {
    const {
      project,
      dispatchProject,
      openModal,
      // selectedRole,
      // setSelectedRole,
      setOpenModal,
      submitting,
      setSubmitting,
      //   selectedCategories,
      //   setSelectedCategories,
    } = useContext(LaunchProjectContext);

    const [talentAttributes, setTalentAttributes] = useState({});

    useEffect(() => {
      if (talentAttributes) console.log("talentAttributes", talentAttributes);
    }, [talentAttributes]);

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
              title: project?.title,
              description: project?.description,
              descriptionOneLine: project?.descriptionOneLine,
              emoji: project?.emoji,
              role: project?.role?.map((role) => ({
                title: role?.title,
                description: role?.description,
                openPositions: role?.openPositions,
                hoursPerWeek: role?.hoursPerWeek,
                keyRosponsibilities: role?.keyRosponsibilities,
                budget: {
                  token: role?.budget?.token,
                  perHour: role?.budget?.perHour,
                },
                skills: role?.skills?.map((skill) => ({
                  _id: skill?.skillData?._id,
                  level: skill?.level,
                })),
              })),
              collaborationLinks: project?.collaborationLinks,
            } as UpdateProjectInput,
          },
          context: { serviceName: "soilservice" },
          onCompleted: (data) => {
            updateProject({
              variables: {
                fields: {
                  _id: data.updateProject?._id,
                  team: project?.team?.map((member) => ({
                    memberID: member?.memberInfo?._id,
                    roleID: data.updateProject?.role?.find(
                      (role) =>
                        project.role?.find(
                          (role) => member?.roleID === role?._id
                        )?.title === role?.title
                    )?._id,
                    phase: "shortlisted",
                  })),
                },
              },
              context: { serviceName: "soilservice" },
              onCompleted: () => {
                setOpenModal(LaunchProjectModal.CONGRATULATIONS);
                setSubmitting(false);
              },
              onError: (error) => {
                console.log(error);

                setSubmitting(false);
                setOpenModal(null);
              },
            });
          },
          onError: (error) => {
            console.log(error);

            setSubmitting(false);
            setOpenModal(null);
          },
        });
      }
    }, [submitting]);

    // const handleAddRole = (role: Maybe<RoleTemplate>) => {
    //   if (role) {
    //     const mappedRole = {
    //       title: role.title,
    //       _id: project?.role?.length.toString(),
    //       skills: role.skills?.map((skill: Maybe<Skills>) => ({
    //         skillData: {
    //           _id: skill?._id,
    //           name: skill?.name,
    //         },
    //       })) as SkillRoleType[],
    //     } as RoleType;

    //     dispatchProject!({
    //       payload: mappedRole,
    //       type: ProjectActionKind.ADD_ROLE,
    //     });
    //     setOpenModal(null);
    //     setSelectedRole(mappedRole);
    //   }
    // };

    // console.log("openModal", openModal);
    // console.log(LaunchProjectModal);

    return (
      <>
        {/* {openModal === LaunchProjectModal.ROLE && (
          <RoleModal
            openModal={openModal === LaunchProjectModal.ROLE}
            onSubmit={handleAddRole}
          />
        )} */}
        {openModal === LaunchProjectModal.SKILLS_CATEGORY && (
          <FindTalentModal
            openModal={openModal === LaunchProjectModal.SKILLS_CATEGORY}
            onClose={() => setOpenModal(LaunchProjectModal.PRIORITIZE)}
            onSubmit={(val: any) => setTalentAttributes(val)}
            // onClose={() => setOpenModal(null)}
            // onSubmit={(val: any) => {
            //   setTalentAttributes(val);
            //   setOpenModal(LaunchProjectModal.PRIORITIZE);
            // }}
          />

          //   <SkillsCategoryModal
          //     key={"" + project?.role?.length}
          //     isOpen={openModal === LaunchProjectModal.SKILLS_CATEGORY}
          //     onSubmit={(val: SkillCategory[]) => {
          //       setSelectedCategories(val);
          //       setOpenModal(LaunchProjectModal.SKILLS_SUBCATEGORY);
          //     }}
          //   />
        )}
        {/* {openModal === LaunchProjectModal.SKILLS_SUBCATEGORY && (
          <SkillsSubcategoryModal
            key={"" + project?.role?.length}
            categories={selectedCategories || []}
            isOpen={openModal === LaunchProjectModal.SKILLS_SUBCATEGORY}
            onSubmit={function (val): void {
              const newRole = {
                _id: project?.role?.length.toString(),
                // generate title for the role
                title: val
                  .map((category: SkillCategory) =>
                    category?.subCategorySkill
                      ?.map(
                        (subcategory: Maybe<SkillSubCategory>) =>
                          subcategory?.name
                      )
                      .join(", ")
                  )
                  .join(", "),
                // this concat will generate an array with all the skills
                skills: ([] as any[]).concat(
                  ...val.map((category) => {
                    return category?.skills?.map(
                      (skill: Skills) =>
                        ({
                          skillData: { ...skill },
                        } as SkillRoleType)
                    );
                  })
                ),
              } as RoleType;

              setSelectedCategories(val);
              dispatchProject!({
                type: ProjectActionKind.ADD_ROLE,
                payload: newRole,
              });
              setSelectedRole(newRole);
              setOpenModal(LaunchProjectModal.SKILLS_ON_CATEGORY);
            }}
          />
        )} */}
        {/* {openModal === LaunchProjectModal.SKILLS_ON_CATEGORY && (
          <SkillsOnCategoryModal
            key={"" + project?.role?.length}
            isOpen={openModal === LaunchProjectModal.SKILLS_ON_CATEGORY}
            skills={selectedRole?.skills}
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
            handelAddSkills={() => setOpenModal(LaunchProjectModal.PRIORITIZE)}
          />
        )} */}
        {openModal === LaunchProjectModal.PRIORITIZE && (
          <PrioritizeModal
            key={"" + project?.role?.length}
            battery
            openModal={openModal === LaunchProjectModal.PRIORITIZE}
            onClose={() => {
              // setOpenModal(LaunchProjectModal.REQUIREMENTS);
              setOpenModal(null);
            }}
            onSubmit={(val) => {
              console.log(val);
              setOpenModal(LaunchProjectModal.REQUIREMENTS);
            }}
          />
        )}
        {openModal === LaunchProjectModal.REQUIREMENTS && (
          <RequirementsModal
            salaryData={rangeNumbers}
            battery
            openModal={openModal === LaunchProjectModal.REQUIREMENTS}
            onClose={() => {
              // setOpenModal(LaunchProjectModal.PROJECT_INFO);
              setOpenModal(null);
            }}
            onSubmit={(val) => {
              console.log(val);
              // setOpenModal(LaunchProjectModal.PROJECT_INFO);
              setOpenModal(null);
            }}
          />
        )}
        {/* {openModal === LaunchProjectModal.SKILLS && (
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
        )} */}
        {/* {openModal === LaunchProjectModal.SHORTLISTED_PREVIEW && (
          <ShortlistMemberModal
            isModalOpen={openModal === LaunchProjectModal.SHORTLISTED_PREVIEW}
            roles={project?.role || []}
            members={project?.team!}
            onClickNext={() => {
              setOpenModal(LaunchProjectModal.ROLE_DESCRIPTION);
            }}
          />
        )} */}
        {/* {openModal === LaunchProjectModal.ROLE_DESCRIPTION && (
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
        )} */}
        {openModal === LaunchProjectModal.PROJECT_INFO && (
          <SocialMediaModel
            showModal
            onSubmit={(val: any) => {
              dispatchProject!({
                type: ProjectActionKind.SET_EXTRA_DATA,
                payload: {
                  description: val.description,
                  descriptionOneLine: val.bio,
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
