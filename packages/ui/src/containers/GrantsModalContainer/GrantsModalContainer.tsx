import { GrantsContext, GrantsModal } from "@eden/package-context";
import {
  DiscoverTalentDropdownModal,
  // PrioritizeModal,
  ProjectsMatchesModal,
  RequirementsModal,
  SkipFlowModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export interface IGrantsModalContainerProps {
  // eslint-disable-next-line no-unused-vars
  setArrayOfNodes?: (val: string[]) => void;
}

export const GrantsModalContainer = ({
  setArrayOfNodes,
}: IGrantsModalContainerProps) => {
  // const { project, openModal, setOpenModal } = useContext(GrantsContext);
  const { openModal, setOpenModal } = useContext(GrantsContext);

  const [nextStep, setNextStep] = useState<any>(null);
  const [nodeIdArray, setNodeIdArray] = useState<string[]>([]);

  useEffect(() => {
    if (nodeIdArray) {
      setArrayOfNodes?.(nodeIdArray);
    }
  }, [nodeIdArray]);

  const matchType = `Grants`;

  console.log("grants modal container", openModal);

  return (
    <>
      {openModal === GrantsModal.SKIP_ALERT && (
        <SkipFlowModal
          openModal={openModal === GrantsModal.SKIP_ALERT}
          onSkipStep={() => setOpenModal(nextStep)}
          onSkipFlow={() => setOpenModal(null)}
          percentage={50}
        />
      )}

      {openModal === GrantsModal.START_INFO && (
        <ProjectsMatchesModal
          openModal={openModal === GrantsModal.START_INFO}
          onSubmit={() => {
            setOpenModal(GrantsModal.SKILLS_CATEGORY);
          }}
          header1={"Looking for a Grant?"}
          header2={"Let's help you find one!"}
          batteryPercentageBefore={10}
          numMatchesBefore={210}
          batteryPercentageAfter={70}
          numMatchesAfter={8}
          matchType={matchType}
        />
      )}

      {openModal === GrantsModal.SKILLS_CATEGORY && (
        <DiscoverTalentDropdownModal
          openModal={openModal === GrantsModal.SKILLS_CATEGORY}
          onClose={() => {
            setOpenModal(GrantsModal.SKIP_ALERT);
            setNextStep(GrantsModal.PRIORITIZE);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: string[]) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(GrantsModal.SKILLS_SUBCATEGORY);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with.`}
          nodeType={`expertise`}
          matchType={matchType}
        />
      )}

      {openModal === GrantsModal.SKILLS_SUBCATEGORY && (
        <DiscoverTalentDropdownModal
          openModal={openModal === GrantsModal.SKILLS_SUBCATEGORY}
          onClose={() => {
            setOpenModal(GrantsModal.SKIP_ALERT);
            setNextStep(GrantsModal.REQUIREMENTS);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: string[] | null) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(GrantsModal.REQUIREMENTS);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with.`}
          nodeType={`typeProject`}
          matchType={matchType}
        />
      )}

      {/* {openModal === GrantsModal.PRIORITIZE && (
        <PrioritizeModal
          key={"" + project?.role?.length}
          battery
          openModal={openModal === GrantsModal.PRIORITIZE}
          onClose={() => {
            setOpenModal(GrantsModal.SKIP_ALERT);
            setNextStep(GrantsModal.REQUIREMENTS);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(GrantsModal.REQUIREMENTS);
          }}
          numMatches={38}
        />
      )} */}

      {openModal === GrantsModal.REQUIREMENTS && (
        <RequirementsModal
          salaryData={rangeNumbers}
          battery
          openModal={openModal === GrantsModal.REQUIREMENTS}
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
          matchType={matchType}
        />
      )}
    </>
  );
};
