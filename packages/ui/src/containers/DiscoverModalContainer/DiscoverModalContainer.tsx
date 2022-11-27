import { DiscoverContext, DiscoverModal } from "@eden/package-context";
import {
  DiscoverTalentDropdownModal,
  PrioritizeModal,
  ProjectsMatchesModal,
  RequirementsModal,
  SkipFlowModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export interface IDiscoverModalContainerProps {
  // eslint-disable-next-line no-unused-vars
  setArrayOfNodes?: (val: string[]) => void;
}

export const DiscoverModalContainer = ({
  setArrayOfNodes,
}: IDiscoverModalContainerProps) => {
  const { project, openModal, setOpenModal } = useContext(DiscoverContext);

  const [nextStep, setNextStep] = useState<any>(null);
  const [nodeIdArray, setNodeIdArray] = useState<string[]>([]);

  useEffect(() => {
    if (nodeIdArray) {
      setArrayOfNodes?.(nodeIdArray);
    }
  }, [nodeIdArray]);

  return (
    <>
      {openModal === DiscoverModal.SKIP_ALERT && (
        <SkipFlowModal
          openModal={openModal === DiscoverModal.SKIP_ALERT}
          onSkipStep={() => setOpenModal(nextStep)}
          onSkipFlow={() => setOpenModal(null)}
          percentage={50}
        />
      )}

      {openModal === DiscoverModal.START_INFO && (
        <ProjectsMatchesModal
          openModal={openModal === DiscoverModal.START_INFO}
          onSubmit={() => {
            setOpenModal(DiscoverModal.SKILLS_CATEGORY);
          }}
          batteryPercentageBefore={10}
          numMatchesBefore={210}
          batteryPercentageAfter={70}
          numMatchesAfter={8}
          matchType={`People`}
        />
      )}

      {openModal === DiscoverModal.SKILLS_CATEGORY && (
        <DiscoverTalentDropdownModal
          openModal={openModal === DiscoverModal.SKILLS_CATEGORY}
          onClose={() => {
            setOpenModal(DiscoverModal.SKIP_ALERT);
            setNextStep(DiscoverModal.PRIORITIZE);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: string[]) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(DiscoverModal.SKILLS_SUBCATEGORY);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with.`}
          nodeType={`expertise`}
        />
      )}

      {openModal === DiscoverModal.SKILLS_SUBCATEGORY && (
        <DiscoverTalentDropdownModal
          openModal={openModal === DiscoverModal.SKILLS_SUBCATEGORY}
          onClose={() => {
            setOpenModal(DiscoverModal.SKIP_ALERT);
            setNextStep(DiscoverModal.PRIORITIZE);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: string[] | null) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }

            // if (setArrayOfNodes) setArrayOfNodes(val);
            setOpenModal(DiscoverModal.PRIORITIZE);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with.`}
          nodeType={`typeProject`}
        />
      )}

      {openModal === DiscoverModal.PRIORITIZE && (
        <PrioritizeModal
          key={"" + project?.role?.length}
          battery
          openModal={openModal === DiscoverModal.PRIORITIZE}
          onClose={() => {
            setOpenModal(DiscoverModal.SKIP_ALERT);
            setNextStep(DiscoverModal.REQUIREMENTS);
          }}
          onSubmit={(val) => {
            console.log(val);
            setOpenModal(DiscoverModal.REQUIREMENTS);
          }}
          numMatches={38}
        />
      )}

      {openModal === DiscoverModal.REQUIREMENTS && (
        <RequirementsModal
          salaryData={rangeNumbers}
          battery
          openModal={openModal === DiscoverModal.REQUIREMENTS}
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
    </>
  );
};
