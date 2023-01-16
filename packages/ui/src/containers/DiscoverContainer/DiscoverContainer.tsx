import { DiscoverContext, DiscoverModal } from "@eden/package-context";
import {
  DiscoverTalent,
  DragDrop,
  TestDiscoverTalentDropdownModal,
  Prioritize,
  Requirements,
} from "@eden/package-ui";
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
  const [elements, setElements] = useState<any[]>([]);

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
        <TestDiscoverTalentDropdownModal
          openModal={openModal === DiscoverModal.SKILLS_CATEGORY}
          onNext={(val: string[], valNames: string[]) => {
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            if (valNames) {
              const items = valNames.map((names, i) => ({
                id: `${i}`,
                content: names,
              }));
              if (setElements) setElements(items);
            }
            setOpenModal(DiscoverModal.ORDER_SKILLS_FIRST);
          }}
          title={`Who are you looking for?`}
          subTitle={`Select what you want them to help you with. ?`}
          nodeType={`expertise`}
          matchType={matchType}
        />
      )}

      {openModal === DiscoverModal.ORDER_SKILLS_FIRST && (
        <DragDrop
          title="Drag & Drop according to your level of expertise:"
          elements={elements}
          onPrev={() => {
            setOpenModal(DiscoverModal.SKILLS_CATEGORY);
          }}
          onNext={() => {
            setOpenModal(DiscoverModal.SKILLS_SUBCATEGORY);
          }}
        />
      )}

      {openModal === DiscoverModal.SKILLS_SUBCATEGORY && (
        <DiscoverTalent
          openModal={openModal === DiscoverModal.SKILLS_SUBCATEGORY}
          onNext={(val: string[], valNames: string[]) => {
            if (val) {
              if (setNodeIdArray) setNodeIdArray([...nodeIdArray, ...val]);
            }
            if (valNames) {
              const items = valNames.map((names, i) => ({
                id: `${i}`,
                content: names,
              }));
              if (setElements) setElements(items);
            }
            setOpenModal(DiscoverModal.ORDER_SKILLS_SECOND);
          }}
          onPrev={() => {
            setOpenModal(DiscoverModal.ORDER_SKILLS_FIRST);
          }}
          title={`What are you looking for?`}
          nodeType={`typeProject`}
          matchType={matchType}
        />
      )}

      {openModal === DiscoverModal.ORDER_SKILLS_SECOND && (
        <DragDrop
          title="Choose the Order for your Roles, from your best to worst
          (you can drag and drop)"
          elements={elements}
          onPrev={() => {
            setOpenModal(DiscoverModal.SKILLS_CATEGORY);
          }}
          onNext={() => {
            setOpenModal(DiscoverModal.PRIORITIZE);
          }}
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
