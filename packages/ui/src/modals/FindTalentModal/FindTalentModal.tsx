import {
  BatteryStepper,
  Button,
  Modal,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useEffect, useMemo, useState } from "react";

import { BadgeSelector } from "../../selectors/BadgeSelector";

type Item = { _id: string; name: string };

type Data = {
  _id: string;
  title: string;
  items: Item[];
  battery?: boolean;
  subtitle?: string;
  itemsTitle: string;
};

export interface FindTalentModalProps {
  data: Data[];
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: { [key: number]: Item[] }) => void;
}

export const FindTalentModal = ({
  data,
  onClose,
  openModal,
  onSubmit,
}: FindTalentModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const section = useMemo(() => data[currentStep], [data, currentStep]);
  const [selectedItems, setSelectedItemes] = useState<{
    [key: number]: Item[];
  }>([]);

  useEffect(() => {
    onSubmit && onSubmit(selectedItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <div className="flex justify-between">
          <div className="flex-1">
            <TextHeading3>{section.title}</TextHeading3>
            <TextBody className={`font-medium text-gray-500`}>
              {section.subtitle}
            </TextBody>
          </div>

          {section.battery && <BatteryStepper currentStep={currentStep + 1} />}
        </div>
        <section className="mt-4">
          <div>
            <TextHeading3>{section.itemsTitle}</TextHeading3>
          </div>
          <div className="my-8 ml-4 flex w-full justify-center">
            <BadgeSelector
              items={section.items}
              onChange={(selectedItems) =>
                setSelectedItemes((prevState) => ({
                  ...prevState,
                  [currentStep]: selectedItems,
                }))
              }
            />
          </div>
        </section>
        <div className="flex justify-between">
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Skip
          </Button>
          <Button
            radius="rounded"
            variant={`secondary`}
            disabled={currentStep === data.length - 1}
            onClick={() => setCurrentStep((prevState) => prevState + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
