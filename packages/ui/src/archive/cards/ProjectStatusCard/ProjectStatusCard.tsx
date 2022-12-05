import {
  Maybe,
  PhaseType,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  Date,
  DateCardProps,
  ProgressStepper,
} from "@eden/package-ui";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ProjectStatusCardProps {
  project?: ProjectMemberType;
  roleName?: string;
  appliedDateData?: DateCardProps;
  kickoffDateData?: DateCardProps;
}

export const getProgressFrom = (phase?: Maybe<PhaseType>) => {
  return [
    {
      name: "Applied",
      completed:
        phase === "engaged" ||
        phase === "invited" ||
        phase === "shortlisted" ||
        phase === "committed",
    },
    {
      name: "Invited to Project",
      completed:
        phase === "invited" || phase === "shortlisted" || phase === "committed",
    },
    {
      name: "Application Reviewed",
      completed: phase === "shortlisted" || phase === "committed",
    },
    {
      name: "Application Accepted",
      completed: phase === "committed",
    },
  ];
};

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  project,
  roleName,
  appliedDateData,
}) => {
  const [cardStatus, setCardStatus] = useState(false);

  const steps = getProgressFrom(project?.phase);

  // console.log("project", project);

  return (
    <Card border>
      <div className="flex w-full items-center justify-between">
        <div className="mb-4 flex items-center justify-start">
          <div>
            <Avatar
              size="md"
              src={""}
              isProject
              emoji={project?.info?.emoji as string}
              backColorEmoji={project?.info?.backColorEmoji as string}
            />
          </div>
          <div className="ml-6 flex flex-col items-start justify-start">
            <h1 className="text-lg text-black">{project?.info?.title}</h1>
            {roleName && (
              <div className="bg-ColorF1F2FF rounded-sm py-1 px-3">
                {roleName}
              </div>
            )}
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
              {appliedDateData && (
                <Date
                  type={appliedDateData?.type}
                  dayOfMonth={appliedDateData?.dayOfMonth}
                  month={appliedDateData?.month}
                  year={appliedDateData?.year}
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-start">
              <p className="mb-1 text-xs uppercase text-gray-300">KICKOFF</p>
              {project?.info?.dates?.kickOff && (
                <Date
                // type={kickoffDateData?.type}
                // dayOfMonth={kickoffDateData?.dayOfMonth}
                // month={kickoffDateData?.month}
                // year={kickoffDateData?.year}
                />
              )}
            </div>
          </div>
          <ProgressStepper steps={steps} />
        </>
      )}
    </Card>
  );
};
