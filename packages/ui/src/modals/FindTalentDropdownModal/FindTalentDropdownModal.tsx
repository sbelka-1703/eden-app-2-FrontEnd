import {
  BatteryStepper,
  Button,
  Modal,
  SelectBox,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { forEach, get, isEmpty, map, omitBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Item = {
  subTitle: string;
  title: string;
  numMatches: string;
  content: string[];
};

type Data = {
  _id: string;
  title: string;
  battery?: boolean;
  subtitle?: string;
  hideSkip?: boolean;
  numMatches?: string;
  itemsTitle?: string;
  items: { [key: string]: Item };
};

export interface FindTalentDropdownModalProps {
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: { [key: number]: Item[] }) => void;
  mockData?: any;
}

export const FindTalentDropdownModal = ({
  onClose,
  openModal,
  onSubmit,
  mockData,
}: FindTalentDropdownModalProps) => {
  const section: Data = useMemo(
    () => ({
      _id: "main",
      title: mockData?.SkillTree?.category?.title
        ? mockData.SkillTree.category.title
        : "Alright, tell me who should I find to help you with your project?",
      subtitle: mockData?.SkillTree?.category?.subTitle
        ? mockData.SkillTree.category.subTitle
        : "Please pick only one role for now!",
      battery: true,
      itemsTitle: "Focus On:",
      items: omitBy(mockData, (_, key) => key === "subCategories") as {
        [key: string]: Item;
      },
    }),
    [mockData]
  );

  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [selectedItems, setSelectedItemes] = useState<{
    [key: string]: Item[];
  }>({});
  const [numMatches, setNumMatches] = useState(0);

  const handleNext = () => {
    if (numMatches === 0) {
      toast.error("You should at least choose on of the items before proceed");
    } else {
      onClose();
    }
  };

  useEffect(() => {
    onSubmit && onSubmit(selectedItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  useEffect(() => {
    let numMatches = 0;
    let batteryPercentage = 0;

    forEach(selectedItems, (el, key) => {
      if (!isEmpty(el)) {
        numMatches += +get(section, `items.${key}.numMatches`, 0);
        batteryPercentage += 10;
      }
    });

    setNumMatches(numMatches);
    setBatteryPercentage(batteryPercentage);
  }, [section, selectedItems]);

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
                numMatches={numMatches}
                batteryPercentage={batteryPercentage}
              />
            )}
          </div>
          <section className="mt-4">
            <div>
              <TextHeading3>{section?.itemsTitle}</TextHeading3>
            </div>
            <div className="my-8 ml-4 flex w-full flex-wrap justify-center gap-2">
              {!isEmpty(section.items) &&
                map(section.items, (item, key) => (
                  <SelectBox
                    multiple
                    key={key}
                    caption={key}
                    items={item.content}
                    onChange={(selectedItems) => {
                      setSelectedItemes((prevState) => ({
                        ...prevState,
                        [key]: selectedItems,
                      }));
                    }}
                  />
                ))}
            </div>
          </section>
          <div className="flex justify-between">
            <div>
              <Button radius="rounded" variant={`secondary`} onClick={onClose}>
                Skip
              </Button>
            </div>
            <Button radius="rounded" variant={`secondary`} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
