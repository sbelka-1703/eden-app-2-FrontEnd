import { DiscoverContext, DiscoverModal } from "@eden/package-context";
import { DiscoverTalent, Prioritize, Requirements } from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export interface IDiscoverContainerProps {
  // eslint-disable-next-line no-unused-vars
  setArrayOfNodes?: (val: string[]) => void;
}

export const DiscoverContainer = ({
  setArrayOfNodes,
}: IDiscoverContainerProps) => {
  const { project, openModal, setOpenModal } = useContext(DiscoverContext);

  const [nodeIdArray, setNodeIdArray] = useState<string[]>([]);

  useEffect(() => {
    if (nodeIdArray) {
      setArrayOfNodes?.(nodeIdArray);
    }
  }, [nodeIdArray]);

  useEffect(() => {
    setOpenModal(DiscoverModal.SKILLS_CATEGORY);
  }, []);

  const matchType = `People`;

  return (
    <>
      {openModal === DiscoverModal.SKILLS_CATEGORY && (
        <DiscoverTalent
          openModal={openModal === DiscoverModal.SKILLS_CATEGORY}
          onNext={(val: string[]) => {
            console.log("val", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            setOpenModal(DiscoverModal.SKILLS_SUBCATEGORY);
          }}
          title={`Who are you ?`}
          nodeType={`expertise`}
          matchType={matchType}
        />
      )}

      {openModal === DiscoverModal.SKILLS_SUBCATEGORY && (
        <DiscoverTalent
          openModal={openModal === DiscoverModal.SKILLS_SUBCATEGORY}
          onNext={(val: string[] | null) => {
            console.log("val2", val);
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }

            // if (setArrayOfNodes) setArrayOfNodes(val);
            setOpenModal(DiscoverModal.PRIORITIZE);
          }}
          onPrev={() => {
            setOpenModal(DiscoverModal.SKILLS_CATEGORY);
          }}
          title={`What are you looking for?`}
          nodeType={`typeProject`}
          matchType={matchType}
        />
      )}

      {openModal === DiscoverModal.PRIORITIZE && (
        <Prioritize
          key={"" + project?.role?.length}
          battery
          openModal={openModal === DiscoverModal.PRIORITIZE}
          onPrev={() => {
            setOpenModal(DiscoverModal.SKILLS_SUBCATEGORY);
          }}
          onNext={(val) => {
            console.log(val);
            setOpenModal(DiscoverModal.REQUIREMENTS);
          }}
          numMatches={38}
        />
      )}

      {openModal === DiscoverModal.REQUIREMENTS && (
        <Requirements
          salaryData={rangeNumbers}
          battery
          openModal={openModal === DiscoverModal.REQUIREMENTS}
          onPrev={() => {
            setOpenModal(DiscoverModal.PRIORITIZE);
          }}
          onNext={(val) => {
            console.log(val);
            setOpenModal(null);
          }}
          numMatches={23}
        />
      )}
    </>
  );
};
