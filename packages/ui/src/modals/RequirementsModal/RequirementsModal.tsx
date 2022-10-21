import {
  Button,
  Modal,
  SalaryRangeChart,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface RequirementsModalProps {
  openModal?: boolean;
  onClose: () => void;
  salaryData: number[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (salaryRange: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const RequirementsModal = ({
  // onClose,
  onSubmit,
  openModal,
  salaryData,
}: RequirementsModalProps) => {
  const [salaryRange, setSalaryRange] = useState<{
    domain: number[];
    update: number[];
    values: number[];
  }>({
    domain: [],
    update: [],
    values: [],
  });

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <TextHeading3>Proposed salary rates</TextHeading3>

        <TextBody className={`font-medium text-gray-500`}>
          Based on the salary, choose the people you want to see
        </TextBody>

        <div className="mx-auto flex max-w-md flex-col justify-center">
          {!!salaryData.length && (
            <SalaryRangeChart data={salaryData} onChange={setSalaryRange} />
          )}
        </div>
        <div className="flex justify-center">
          {/* <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Back
          </Button> */}
          <Button
            radius="rounded"
            variant={`secondary`}
            onClick={() => onSubmit(salaryRange)}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
