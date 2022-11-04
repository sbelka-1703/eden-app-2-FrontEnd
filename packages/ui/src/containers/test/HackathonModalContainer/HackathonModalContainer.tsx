import { HackathonContext, HackathonProjectModal } from "@eden/package-context";
import {
  CongratulationsModal,
  DataReviewModal,
  FindTalentDropdownModal,
  FindTalentModal,
  PrioritizeModal,
  RequirementsModal,
  ReviewModal,
  //   SavingProjectModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

// @TODO mock data to be removed

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

// -----------------

export interface IHackathonModalContainerProps {
  // eslint-disable-next-line no-unused-vars
  setSubmittingTalentAttributes?: (val: any) => void;
  mockData?: any;
}

export const HackathonModalContainer = ({
  setSubmittingTalentAttributes,
  mockData,
}: IHackathonModalContainerProps) => {
  const {
    project,
    // dispatchProject,
    openModal,
    setOpenModal,
    // submitting,
    // setSubmitting,
  } = useContext(HackathonContext);

  const [talentAttributes, setTalentAttributes] = useState<any>({});

  useEffect(() => {
    if (talentAttributes?.main)
      console.log("talentAttributes", talentAttributes);
  }, [talentAttributes]);

  //   console.log("mockData", mockData);

  //   useEffect(() => {
  //     if (submitting) {
  //       setOpenModal(HackathonProjectModal.SAVING_PROJECT);
  //     }
  //   }, [submitting]);

  return (
    <>
      {openModal === HackathonProjectModal.SKILLS_CATEGORY && (
        <FindTalentModal
          openModal={openModal === HackathonProjectModal.SKILLS_CATEGORY}
          onClose={() =>
            setOpenModal(
              mockData?.ResultPopUpShowFlag.type === "Project" ||
                mockData?.ResultPopUpShowFlag.type === "User"
                ? HackathonProjectModal.SKILLS_SUBCATEGORY
                : HackathonProjectModal.PRIORITIZE
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

      {openModal === HackathonProjectModal.SKILLS_SUBCATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === HackathonProjectModal.SKILLS_SUBCATEGORY}
          onClose={() => setOpenModal(HackathonProjectModal.PRIORITIZE)}
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

      {openModal === HackathonProjectModal.PRIORITIZE && (
        <PrioritizeModal
          key={"" + project?.role?.length}
          battery
          numMatches={120}
          openModal={openModal === HackathonProjectModal.PRIORITIZE}
          onClose={() => {
            // setOpenModal(LaunchProjectModal.REQUIREMENTS);
            setOpenModal(null);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(HackathonProjectModal.REQUIREMENTS);
          }}
        />
      )}
      {openModal === HackathonProjectModal.REQUIREMENTS && (
        <RequirementsModal
          salaryData={rangeNumbers}
          battery
          numMatches={90}
          openModal={openModal === HackathonProjectModal.REQUIREMENTS}
          onClose={() => {
            // setOpenModal(LaunchProjectModal.PROJECT_INFO);
            setOpenModal(null);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(HackathonProjectModal.PROJECT_INFO);
            // setOpenModal(null);
          }}
        />
      )}

      {openModal === HackathonProjectModal.PROJECT_INFO && (
        <ReviewModal
          data={talentAttributes as DataReviewModal}
          openModal={openModal === HackathonProjectModal.PROJECT_INFO}
          onClose={() => {
            setOpenModal(null);
            // setOpenModal(HackathonProjectModal.CONGRATULATIONS);
          }}
        />
      )}
      {/* {openModal === HackathonProjectModal.SAVING_PROJECT && (
        <SavingProjectModal openModal />
      )} */}
      {openModal === HackathonProjectModal.CONGRATULATIONS && (
        <CongratulationsModal openModal />
      )}
    </>
  );
};
