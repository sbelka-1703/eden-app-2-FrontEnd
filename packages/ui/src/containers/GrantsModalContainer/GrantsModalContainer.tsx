import { GrantsContext, GrantsModal, UserContext } from "@eden/package-context";
import {
  DiscoverTalentDropdownModal,
  ProjectsMatchesModal,
  SkipFlowModal,
  WarningModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import { getFillProfilePercentage } from "../../../utils/fill-profile-percentage";

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
  const { currentUser } = useContext(UserContext);
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
          percentage={getFillProfilePercentage(currentUser || {})}
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
            // console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(GrantsModal.SKILLS_SUBCATEGORY);
          }}
          title={`First select your role`}
          subTitle={`Choose any role you want!`}
          nodeType={`expertise`}
          matchType={matchType}
          batteryPercentage={getFillProfilePercentage(currentUser || {})}
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
            // console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            if (getFillProfilePercentage(currentUser || {}) < 60) {
              setOpenModal(GrantsModal.WARNING);
            } else {
              setOpenModal(null);
            }
          }}
          title={`Let's get you sorted! What type of projects are you looking for?`}
          subTitle={`You can choose any area of interest!`}
          nodeType={`typeProject`}
          matchType={matchType}
          batteryPercentage={getFillProfilePercentage(currentUser || {})}
        />
      )}

      {openModal === GrantsModal.WARNING && (
        <WarningModal
          openModal
          profilePercentage={getFillProfilePercentage(currentUser || {})}
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
