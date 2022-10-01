import { Project } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  Date,
  DateCardProps,
  ProgressStep,
  ProgressStepper,
} from "@eden/package-ui";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ProjectStatusCardProps {
  project?: Project;
  projectImg?: string;
  roleName: string;
  progressSteps: ProgressStep[];
  appliedDateData: DateCardProps;
  kickoffDateData: DateCardProps;
}
export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  project,
  projectImg,
  roleName,
  progressSteps,
  appliedDateData,
  kickoffDateData,
}) => {
  const [cardStatus, setCardStatus] = useState(false);

  return (
    <Card border>
      <div className="flex w-full items-center justify-between">
        <div className="mb-4 flex items-center justify-start">
          <Avatar size="lg" src={projectImg} isProject />
          <div className="ml-6 flex flex-col items-start justify-start">
            <h1 className="text-lg text-black">{project?.title}</h1>
            <div className="bg-ColorF1F2FF rounded-sm py-1 px-3">
              {roleName}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <Button
            onClick={() => setCardStatus(!cardStatus)}
            variant="primary"
            radius="rounded"
          >
            <p className="flex items-center justify-center text-sm">
              {cardStatus ? "Hide Status" : "View Status"}
              <BsArrowRight className={`my-auto ml-2`} />
            </p>
          </Button>
          <a className="mt-2 text-sm text-black underline">More info</a>
        </div>
      </div>
      {cardStatus && (
        <>
          <div className="mb-6 flex items-center justify-start">
            <div className="mr-6 flex flex-col items-center justify-start">
              <p className="mb-1 text-xs uppercase text-gray-300">
                DATE APPLIED
              </p>
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
        </>
      )}
    </Card>
  );
};
