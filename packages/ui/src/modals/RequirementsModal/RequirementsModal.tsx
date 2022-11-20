import {
  BatteryStepper,
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
  battery?: boolean;
  numMatches?: number | string;
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
  battery = false,
  openModal,
  salaryData,
  numMatches,
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
        <div className="flex justify-between">
          <div className="flex-1">
            <TextHeading3>Finally, let’s talk money!</TextHeading3>
            <TextBody className={`font-medium text-gray-500`}>
              Specify the range you’d be willing to pay.
            </TextBody>
          </div>

          {battery && (
            <BatteryStepper batteryPercentage={90} numMatches={numMatches} />
          )}
        </div>

        <div className="mx-auto flex max-w-md flex-col justify-center">
          {!!salaryData.length && (
            <SalaryRangeChart data={salaryData} onChange={setSalaryRange} />
          )}
        </div>
        <div className="flex justify-between">
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Skip
          </Button>
          <Button
            radius="rounded"
            variant={`secondary`}
            onClick={() => onSubmit(salaryRange)}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
