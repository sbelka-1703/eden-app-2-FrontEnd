import { useMutation } from "@apollo/client";
import {
  LaunchProjectContext,
  LaunchProjectModal,
  // ProjectActionKind,
} from "@eden/package-context";
import { UPDATE_PROJECT } from "@eden/package-graphql";
import { Mutation, UpdateProjectInput } from "@eden/package-graphql/generated";
import {
  CongratulationsModal,
  DataReviewModal,
  FindTalentModal,
  PrioritizeModal,
  RequirementsModal,
  ReviewModal,
  SavingProjectModal,
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
      // dispatchProject,
      openModal,
      setOpenModal,
      submitting,
      setSubmitting,
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

    return (
      <>
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
        )}

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
              setOpenModal(LaunchProjectModal.PROJECT_INFO);
              // setOpenModal(null);
            }}
          />
        )}

        {openModal === LaunchProjectModal.PROJECT_INFO && (
          <ReviewModal
            data={talentAttributes as DataReviewModal}
            openModal={openModal === LaunchProjectModal.PROJECT_INFO}
            onClose={() => {
              setOpenModal(LaunchProjectModal.CONGRATULATIONS);
              // setOpenModal(null);
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
