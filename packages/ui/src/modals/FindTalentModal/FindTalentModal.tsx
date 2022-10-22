import { Button, Modal, TextBody, TextHeading3 } from "@eden/package-ui";
import { useState } from "react";

import { BadgeSelector } from "../../selectors/BadgeSelector";

type Item = { _id: string; name: string };

type Data = {
  section1?: {
    title: string;
    subtitle?: string;
  };
  section2?: {
    title: string;
    subtitle?: string;
  };
  items: Item[];
};

export interface FindTalentModalProps {
  data: Data;
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
      <div>
        <div className="flex justify-between">
          <div className="flex-1">
            <TextHeading3>{data.section1?.title}</TextHeading3>
            <TextBody className={`font-medium text-gray-500`}>
              {data.section1?.subtitle}
            </TextBody>
          </div>

          {/* Will be replaced with battery component */}
          <div className="ml-4 h-28 w-28 bg-black" />
        </div>
        <section>
          <div>
            <TextHeading3>{data.section2?.title}</TextHeading3>
            <TextBody className={`font-medium text-gray-500`}>
              {data.section2?.subtitle}
            </TextBody>
          </div>
          <div className="my-8 ml-4 flex w-full justify-center">
            <BadgeSelector items={data.items} onChange={setSelectedItemes} />
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
    </Modal>
  );
};
