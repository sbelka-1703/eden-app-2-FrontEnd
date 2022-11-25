import { DiscoverContext, DiscoverModal } from "@eden/package-context";
import {
  FindTalentDropdownModal,
  PrioritizeModal,
  ProjectsMatchesModal,
  RequirementsModal,
  SkipFlowModal,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

// @TODO mock data to be removed

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

// -----------------

export interface IDiscoverModalContainerProps {
  // eslint-disable-next-line no-unused-vars
  setSubmittingTalentAttributes?: (val: any) => void;
  mockData?: any;
  matchType?: string;
}

export const DiscoverModalContainer = ({
  setSubmittingTalentAttributes,
  mockData,
  matchType,
}: IDiscoverModalContainerProps) => {
  const {
    project,
    openModal,
    setOpenModal,
    // submitting,
    // setSubmitting,
  } = useContext(DiscoverContext);

  const [talentAttributes, setTalentAttributes] = useState({
    main: [] as any[],
    second: [] as any[],
    third: [] as any[],
  });
  const [nextStep, setNextStep] = useState<any>(null);

  useEffect(() => {
    if (talentAttributes) console.log("talentAttributes", talentAttributes);
  }, [talentAttributes]);

  const mockDataMap1 = {
    SkillTree: {
      subCategories: {
        title: mockData?.SkillTree?.category?.title,
        subTitle: mockData?.SkillTree?.category?.subTitle,
      },
    },
  };

  if (mockData?.SkillTree) {
    Object.keys(mockData?.SkillTree).forEach((key) => {
      if (key !== "category")
        mockDataMap1.SkillTree = {
          ...mockDataMap1.SkillTree,
          [key as keyof Object]: {
            content:
              mockData.SkillTree[key as keyof Object]?.subCategories?.content,
          },
        };
    });
  }

  console.log("openModal", openModal);

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
      {/* keep */}

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
          matchType={matchType}
        />
      )}

      {/* keep */}
      {openModal === DiscoverModal.SKILLS_CATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === DiscoverModal.SKILLS_CATEGORY}
          onClose={() => {
            setOpenModal(DiscoverModal.SKIP_ALERT);
            setNextStep(DiscoverModal.PRIORITIZE);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            const main = Object.keys(val)
              .filter((key) => val[key].length)
              .flat()[0];

            setTalentAttributes({
              ...talentAttributes,
              main: [{ name: main }],
            });
            if (main)
              setSubmittingTalentAttributes!({
                main: [{ name: main }],
              });

            setOpenModal(DiscoverModal.SKILLS_SUBCATEGORY);
          }}
          mockData={mockDataMap1.SkillTree}
          // onClose={() => setOpenModal(null)}
        />
      )}

      {/* keep */}

      {openModal === DiscoverModal.SKILLS_SUBCATEGORY && (
        <FindTalentDropdownModal
          openModal={openModal === DiscoverModal.SKILLS_SUBCATEGORY}
          onClose={() => {
            setOpenModal(DiscoverModal.SKIP_ALERT);
            setNextStep(DiscoverModal.PRIORITIZE);
          }}
          // eslint-disable-next-line no-unused-vars
          onSubmit={(val: any) => {
            const third = Object.keys(val)
              .map((key) => val[key])
              .flat();

            setTalentAttributes({ ...talentAttributes, third: third });
            // setSubmittingTalentAttributes!(val);
            setOpenModal(DiscoverModal.PRIORITIZE);
          }}
          mockData={mockData.SkillTree[talentAttributes?.main[0]?.name]}
          // onClose={() => setOpenModal(null)}
        />
      )}
      {/* keep */}

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
      {/* keep */}

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
