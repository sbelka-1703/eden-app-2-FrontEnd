import React, { useEffect, useState } from "react";
import {
  ProgressStep,
  ProgressStepper,
} from "../../components/ProgressStepper";
import { Avatar, Button, Card } from "../../elements";
import { DateCardProps, Date } from "../../elements/Date";

export enum OpenOrClosed {
  OPEN = "open",
  CLOSED = "closed",
}

export interface ProjectStatusCardProps {
  projectImg: string;
  projectName: string;
  roleName: string;
  status: OpenOrClosed;
  progressSteps: ProgressStep[];
  appliedDateData: DateCardProps;
  kickoffDateData: DateCardProps;
}
export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  projectImg,
  projectName,
  roleName,
  status,
  progressSteps,
  appliedDateData,
  kickoffDateData,
}) => {
  const [cardStatus, setCardStatus] = useState<OpenOrClosed>(
    OpenOrClosed.CLOSED
  );

  useEffect(() => {
    setCardStatus(status);
  }, []);

  return (
    <div className="border-px flex flex-col items-start justify-start rounded-xl border border-black p-8">
      <div className="flex w-full items-center justify-between">
        <div className="mb-4 flex items-center justify-start">
          <Avatar src={projectImg} size="xl" />
          <div className="ml-6 flex flex-col items-start justify-start">
            <h1 className="text-lg text-black">{projectName}</h1>
            <div className="bg-ColorF1F2FF rounded-sm py-1 px-3">
              {roleName}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <Button variant="primary" radius="rounded">
            <p className="text-sm text-black flex justify-center items-center">
              {cardStatus === OpenOrClosed.OPEN ? "Hide Status" : "View Status"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </p>
          </Button>
          <a className="mt-2 text-sm text-black underline">More info</a>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-start">
        <div className="mr-6 flex flex-col items-center justify-start">
          <p className="mb-1 text-xs uppercase text-gray-300">DATE APPLIED</p>
          <Date
            type={appliedDateData?.type}
            dayOfMonth={appliedDateData?.dayOfMonth}
            month={appliedDateData?.month}
            year={appliedDateData?.year}
          />
        </div>
        <div className="flex flex-col items-center justify-start">
          <p className="mb-1 text-xs uppercase text-gray-300">KICKOFF</p>
          <Date
            type={kickoffDateData?.type}
            dayOfMonth={kickoffDateData?.dayOfMonth}
            month={kickoffDateData?.month}
            year={kickoffDateData?.year}
          />
        </div>
      </div>
      <ProgressStepper steps={progressSteps} />
    </div>
  );
};
