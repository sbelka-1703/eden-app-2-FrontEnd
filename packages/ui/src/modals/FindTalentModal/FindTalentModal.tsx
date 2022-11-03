import {
  BadgeSelector,
  BatteryStepper,
  Button,
  Modal,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { filter, flatten, forEach, includes, isEmpty, map, uniq } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { skillTreeWork } from "./skillTreeWork";

type Item = { _id: string; name: string };

type Data = {
  _id: string;
  title: string;
  items: Item[];
  battery?: boolean;
  subtitle?: string;
  hideSkip?: boolean;
  numMatches?: string;
  itemsTitle?: string;
};

export interface FindTalentModalProps {
  openModal?: boolean;
  onClose: () => void;
  randomNumber?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: { [key: number]: Item[] }) => void;
  mockData?: any;
}

const MAIN_STEPS = 3;

export const FindTalentModal = ({
  onClose,
  openModal,
  onSubmit,
  randomNumber,
  mockData,
}: FindTalentModalProps) => {
  const generateId = randomNumber
    ? () => Math.random().toString()
    : () => uuidv4();

  const mainCategories: Data = {
    _id: "main",
    hideSkip: true,
    title: mockData?.SkillTree?.category?.title
      ? mockData.SkillTree.category.title
      : "Alright, tell me who should I find to help you with your project?",
    subtitle: mockData?.SkillTree?.category?.subTitle
      ? mockData.SkillTree.category.subTitle
      : "Please pick only one role for now!",
    battery: false,
    items: mockData?.SkillTree?.category
      ? Object.keys(mockData.SkillTree)
          .map((item) => ({
            _id: generateId(),
            name: item,
          }))
          .filter((item) => item.name !== "category")
      : Object.keys(skillTreeWork).map((item) => ({
          _id: generateId(),
          name: item,
        })),
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [section, setSection] = useState<Data>(mainCategories);
  const [selectedItems, setSelectedItemes] = useState<{
    [key: string]: Item[];
  }>({});
  const [vibeData, setVibeData] = useState<Data[]>([]);

  const handleNext = (id: string) => {
    if (isEmpty(selectedItems[id])) {
      toast.error("You should at least choose on of the items before proceed");
    } else if (
      currentStep >=
      MAIN_STEPS + (vibeData.length > 0 ? vibeData.length - 1 : 0)
    ) {
      onClose();
    } else {
      if (vibeData.length > 0) {
        const current = currentStep - MAIN_STEPS;

        setSection(vibeData[current + 1]);
      } else if (id === "main") {
        const selectedSkills = filter(skillTreeWork, (_, key) =>
          includes(
            selectedItems[id].map((item) => item.name),
            key
          )
        );

        const skills = flatten(
          selectedSkills.map((item) => item["subCategories"])
        );

        const data: Data = {
          _id: "second",
          title: mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
            ?.subCategories.title
            ? mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
                ?.subCategories.title
            : "It’s time to teach our AI what exacty you’re looking for 👉🏽",
          subtitle: mockData?.SkillTree[
            selectedItems.main[0].name as keyof Object
          ]?.subCategories.subTitle
            ? mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
                ?.subCategories.subTitle
            : "Now, let’s get a bit more specific about the Design Ninja you need!",
          itemsTitle: `I want a ${selectedItems.main[0].name} Ninja to:`,
          battery: true,
          items: selectedItems.main[0]
            ? mockData?.SkillTree[
                selectedItems.main[0].name as keyof Object
              ]?.subCategories.content.map((item: any) => ({
                _id: generateId(),
                name: item,
              }))
            : skills.map((item) => ({
                _id: generateId(),
                name: item,
              })),
          numMatches:
            mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
              ?.subCategories?.numMatches,
        };

        // console.log(
        //   "numMatches",
        //   mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
        // );

        setSection(data);
      } else if (id === "second") {
        const firstSkill = selectedItems["main"][0].name;
        const initialSkills = Object.keys(
          mockData?.SkillTree[firstSkill as keyof typeof skillTreeWork]
        ).filter(
          (item) => item !== "subCategories" && item !== "Focus On Page"
        );

        const data: Data = {
          _id: "third",
          title:
            "Cool! What should I focus on while looking for a Design Ninja?",
          subtitle:
            "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
          itemsTitle: "Focus on:",
          battery: true,
          items: selectedItems.main
            ? Object.keys(
                mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
              )
                .filter(
                  (item) => item !== "subCategories" && item !== "Focus On Page"
                )
                .map((item) => ({
                  _id: generateId(),
                  name: item,
                }))
            : initialSkills.map((item) => ({
                _id: generateId(),
                name: item,
              })),
          numMatches:
            mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
              ?.subCategories?.numMatches,
        };

        // console.log(
        //   "numMatches",
        //   mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
        // );

        setSection(data);
      } else if (id === "third") {
        const selectedMainSkills = selectedItems["main"].map(
          (item) => item.name
        );
        const selectedThirdSkills = selectedItems["third"].map(
          (item) => item.name
        );

        const skills = selectedMainSkills.reduce((prev, currKey) => {
          if (includes(selectedMainSkills, currKey)) {
            return {
              ...prev,
              [currKey]:
                mockData.SkillTree[currKey as keyof typeof mockData.SkillTree],
            };
          }
          return prev;
        }, {});

        // console.log("selectedThirdSkills", selectedThirdSkills);
        // console.log("skills", skills);
        // console.log(
        //   "numMatches",
        //   mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
        // );

        let combinedSkills: any = {};

        forEach(skills, (value) => {
          forEach(selectedThirdSkills, (item) => {
            // console.log("item", item);
            combinedSkills = {
              ...combinedSkills,
              [item]: combinedSkills[item]
                ? uniq([...combinedSkills[item], ...value[item]]) // TODO: error here, maybe when selectedThirdSkills is doesn't exist in skills
                : value[item],
            };
          });
        });

        const data: Data[] = map(combinedSkills, (value, key) => ({
          _id: key,
          title: value.title
            ? value.title
            : "Vibe check - what values should they possess?",
          subtitle: value.subTitle
            ? value.subTitle
            : "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
          itemsTitle: `${key}:`,
          battery: true,
          items: value?.content?.map((item: string) => ({
            _id: generateId(),
            name: item,
          })),
          numMatches:
            mockData?.SkillTree[selectedItems.main[0].name as keyof Object]
              ?.subCategories?.numMatches,
        }));

        setVibeData(data);

        setSection(data[0]);
      }

      setCurrentStep((current) => current + 1);
    }
  };

  useEffect(() => {
    onSubmit && onSubmit(selectedItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  // console.log("section", section);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      {section && (
        <div>
          <div className="flex justify-between">
            <div className="flex-1">
              <TextHeading3>{section?.title}</TextHeading3>
              <TextBody className={`font-medium text-gray-500`}>
                {section?.subtitle}
              </TextBody>
            </div>

            {section?.battery && (
              <BatteryStepper
                numMatches={section?.numMatches}
                batteryPercentage={currentStep * 20}
              />
            )}
          </div>
          <section className="mt-4">
            <div>
              <TextHeading3>{section?.itemsTitle}</TextHeading3>
            </div>
            <div className="my-8 ml-4 flex w-full justify-center">
              <BadgeSelector
                items={section?.items}
                reset={!selectedItems[section?._id]}
                onChange={(selectedItems) =>
                  setSelectedItemes((prevState) => ({
                    ...prevState,
                    [section?._id]: selectedItems,
                  }))
                }
              />
            </div>
          </section>
          <div className="flex justify-between">
            <div>
              {!section?.hideSkip && (
                <Button
                  radius="rounded"
                  variant={`secondary`}
                  onClick={onClose}
                >
                  Skip
                </Button>
              )}
            </div>
            <Button
              radius="rounded"
              variant={`secondary`}
              onClick={() => handleNext(section?._id)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
