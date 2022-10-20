import {
  Button,
  ICompany,
  Modal,
  SalaryRangeChart,
  TextHeading3,
  UserAttributeChart,
} from "@eden/package-ui";
import { useState } from "react";

export interface RequirementsModalProps {
  openModal?: boolean;
  onClose: () => void;
  salaryData: number[];
  companies: ICompany[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (salaryRange: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const RequirementsModal = ({
  onClose,
  onSubmit,
  openModal,
  companies,
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
        <TextHeading3>
          Proposed salary rates based on your requirements.
        </TextHeading3>

        <div className="mx-auto flex max-w-md flex-col justify-center">
          <UserAttributeChart companies={companies} />
          <SalaryRangeChart data={salaryData} onChange={setSalaryRange} />
        </div>
        <div className="flex justify-between">
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Back
          </Button>
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
