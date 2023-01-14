import {
  BatteryStepper,
  Button,
  Modal,
  SalaryRangeChart,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface RequirementsProps {
  openModal?: boolean;
  onPrev: () => void;
  salaryData: number[];
  battery?: boolean;
  numMatches?: number | string;
  matchType?: string;
  text?: string;
  // eslint-disable-next-line no-unused-vars
  onNext: (salaryRange: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const Requirements = ({
  onNext,
  onPrev,
  battery = false,
  openModal,
  salaryData,
  numMatches,
  matchType,
}: RequirementsProps) => {
  const [salaryRange, setSalaryRange] = useState<{
    domain: number[];
    update: number[];
    values: number[];
  }>({
    domain: [],
    update: [],
    values: [],
  });
  const handleBack = () => {
    if (onPrev) onPrev!();
  };

  return (
    <>
      {openModal && (
        <div>
          <div className="flex justify-between">
            <div className="flex-1">
              <TextHeading3>Finally, let’s talk money!</TextHeading3>
              <TextBody className={`font-medium text-gray-500`}>
                Specify the range you’d be willing to pay.
              </TextBody>
            </div>
          </div>

          <div className="mx-auto flex max-w-md flex-col justify-center">
            {!!salaryData.length && (
              <SalaryRangeChart data={salaryData} onChange={setSalaryRange} />
            )}
          </div>
          <div className="flex justify-between">
            <Button radius="rounded" variant={`secondary`} onClick={handleBack}>
              Prev
            </Button>
            <Button
              radius="rounded"
              variant={`secondary`}
              onClick={() => onNext(salaryRange)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
