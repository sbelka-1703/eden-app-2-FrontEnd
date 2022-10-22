import { Button, Modal, TextBody, TextHeading3 } from "@eden/package-ui";
import { useState } from "react";

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
  onSubmit: (data: Item[]) => void;
}

export const FindTalentModal = ({
  data,
  onClose,
  openModal,
  onSubmit,
}: FindTalentModalProps) => {
  const [selectedItems, setSelectedItemes] = useState<Item[]>([]);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      {data.map((section) => (
        <div key={section._id}>
          <div className="flex justify-between">
            <div className="flex-1">
              <TextHeading3>{section.title}</TextHeading3>
              <TextBody className={`font-medium text-gray-500`}>
                {section.subtitle}
              </TextBody>
            </div>

            {/* Will be replaced with battery component */}
            {section.battery && <div className="ml-4 h-28 w-28 bg-black" />}
          </div>
          <section className="mt-4">
            <div>
              <TextHeading3>{section.itemsTitle}</TextHeading3>
            </div>
            <div className="my-8 ml-4 flex w-full justify-center">
              <BadgeSelector
                items={section.items}
                onChange={setSelectedItemes}
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
              onClick={() => onSubmit(selectedItems)}
            >
              Next
            </Button>
          </div>
        </div>
      ))}
    </Modal>
  );
};
