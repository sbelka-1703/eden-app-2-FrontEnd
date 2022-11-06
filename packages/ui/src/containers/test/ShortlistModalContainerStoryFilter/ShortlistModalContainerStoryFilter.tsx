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
  FindTalentDropdownModal,
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

export interface IShortlistModalContainerStoryFilterProps {
  // eslint-disable-next-line no-unused-vars
  setSubmittingTalentAttributes?: (val: any) => void;
  mockData?: any;
}

export const ShortlistModalContainerStoryFilter = ({
  setSubmittingTalentAttributes,
  mockData,
}: IShortlistModalContainerStoryFilterProps) => {
  const {
    project,
    // dispatchProject,
    openModal,
    setOpenModal,
    submitting,
    setSubmitting,
  } = useContext(LaunchProjectContext);

  const [talentAttributes, setTalentAttributes] = useState({
    main: [] as any[],
    second: [] as any[],
    third: [] as any[],
  });

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
                      project.role?.find((role) => member?.roleID === role?._id)
                        ?.title === role?.title
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

  useEffect(() => {
    console.log("~~~~~~~", talentAttributes);
  }, [talentAttributes]);

  return (
    <>
      {openModal === LaunchProjectModal.SKILLS_CATEGORY && (
        <FindTalentModal
          openModal={openModal === LaunchProjectModal.SKILLS_CATEGORY}
          onClose={() =>
            setOpenModal(
              mockData?.ResultPopUpShowFlag.type === "Project" ||
                mockData?.ResultPopUpShowFlag.type === "User"
                ? LaunchProjectModal.SKILLS_SUBCATEGORY
                : LaunchProjectModal.PRIORITIZE
            )
          }
          onSubmit={(val: any) => {
            setTalentAttributes(val);
            setSubmittingTalentAttributes!(val);
          }}
          mockData={mockData}
          // onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === LaunchProjectModal.SKILLS_SUBCATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === LaunchProjectModal.SKILLS_SUBCATEGORY}
          onClose={() => setOpenModal(LaunchProjectModal.PRIORITIZE)}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            const third = Object.keys(val)
              .map((key) => val[key])
              .flat();

            setTalentAttributes({ ...talentAttributes, third: third });
            // setSubmittingTalentAttributes!(val);
          }}
          mockData={mockData.SkillTree[talentAttributes?.main[0]?.name]}
          // onClose={() => setOpenModal(null)}
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
          numMatches={38}
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
            setOpenModal(null);
            // setOpenModal(null);
          }}
          numMatches={23}
        />
      )}

      {openModal === LaunchProjectModal.PROJECT_INFO && (
        <ReviewModal
          data={talentAttributes as any}
          openModal={openModal === LaunchProjectModal.PROJECT_INFO}
          onClose={() => {
            setOpenModal(null);
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
