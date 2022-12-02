import { GrantsContext, GrantsModal } from "@eden/package-context";
import {
  DiscoverTalentDropdownModal,
  ProjectsMatchesModal,
  SkipFlowModal,
  WarningModal,
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

  // console.log("grants modal container", openModal);

  return (
    <>
      {openModal === GrantsModal.SKIP_ALERT && (
        <SkipFlowModal
          openModal={openModal === GrantsModal.SKIP_ALERT}
          onSkipStep={() => setOpenModal(nextStep)}
          onSkipFlow={() => setOpenModal(null)}
          percentage={30}
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
            setNextStep(GrantsModal.SKILLS_SUBCATEGORY);
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
          batteryPercentage={20}
        />
      )}

      {openModal === GrantsModal.SKILLS_SUBCATEGORY && (
        <DiscoverTalentDropdownModal
          openModal={openModal === GrantsModal.SKILLS_SUBCATEGORY}
          onClose={() => {
            setOpenModal(GrantsModal.SKIP_ALERT);
            setNextStep(GrantsModal.WARNING);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: string[] | null) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(GrantsModal.WARNING);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with.`}
          nodeType={`typeProject`}
          matchType={matchType}
          batteryPercentage={60}
        />
      )}

      {openModal === GrantsModal.WARNING && (
        <WarningModal
          openModal
          profilePercentage={20}
          canSeeProjects={true}
          canProjectsSee={false}
          onSkip={function (): void {
            setOpenModal(null);
          }}
          onNext={function (): void {
            setOpenModal(null);
          }}
        />
      )}
    </>
  );
};
