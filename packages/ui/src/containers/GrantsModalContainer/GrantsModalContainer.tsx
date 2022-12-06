import { GrantsContext, GrantsModal } from "@eden/package-context";
import {
  DiscoverTalentDropdownModal,
  SkipFlowModal,
  WarningModal,
  WelcomeModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export interface IGrantsModalContainerProps {
  image?: any;
  // eslint-disable-next-line no-unused-vars
  setArrayOfNodes?: (val: string[]) => void;
  percentage?: number;
}

export const GrantsModalContainer = ({
  image,
  setArrayOfNodes,
  percentage = 0,
}: IGrantsModalContainerProps) => {
  // const { currentUser } = useContext(UserContext);
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
          percentage={percentage}
        />
      )}

      {openModal === GrantsModal.START_INFO && (
        <WelcomeModal
          image={image}
          openModal={openModal === GrantsModal.START_INFO}
          onNext={() => {
            setOpenModal(GrantsModal.SKILLS_CATEGORY);
          }}
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
          batteryPercentage={percentage}
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
            if (percentage < 50) {
              setOpenModal(GrantsModal.WARNING);
            } else {
              setOpenModal(null);
            }
          }}
          title={`Let's get you sorted! What type of projects are you looking for?`}
          subTitle={`You can choose any area of interest!`}
          nodeType={`typeProject`}
          matchType={matchType}
          batteryPercentage={percentage}
        />
      )}

      {openModal === GrantsModal.WARNING && (
        <WarningModal
          openModal
          profilePercentage={percentage}
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
