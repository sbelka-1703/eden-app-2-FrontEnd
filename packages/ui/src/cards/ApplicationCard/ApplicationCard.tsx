import { Maybe, ProjectMemberType } from "@eden/package-graphql/generated";
import {
  ApplicationModal,
  AvailabilityComp,
  Avatar,
  Button,
  Card,
  GreenStepper,
  SocialMediaComp,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface ApplicationCardProps {
  project?: Maybe<ProjectMemberType>;
}

export const ApplicationCard = ({ project }: ApplicationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const STEPS_DATA = [
    {
      name: "engaged",
      completed:
        project?.phase === "engaged" ||
        project?.phase === "shortlisted" ||
        project?.phase === "invited",
    },
    {
      name: "shortlisted",
      completed:
        project?.phase === "shortlisted" || project?.phase === "invited",
    },
    {
      name: "invited",
      completed: project?.phase === "invited",
    },
    {
      name: "committed",
      completed: project?.phase === "committed",
    },
  ];

  return (
    <>
      <Card className={`mb-4 border border-gray-300 bg-white py-3`}>
        <div className="mb-4 flex  px-2">
          <div className="flex h-12 w-12 items-center justify-center">
            <Avatar
              size="xs"
              isProject
              emoji={project?.info?.emoji as string}
              backColorEmoji={project?.info?.backColorEmoji as string}
            />
          </div>
          <div className="ml-2 flex-1 text-left">
            {project?.info?.title && (
              <TextHeading3 className="border-b">
                {project?.info?.title}
              </TextHeading3>
            )}
            <TextBody>{project?.role?.title}</TextBody>
          </div>
        </div>
        <div className="font-Inter mb-4 px-6 text-left font-medium text-gray-400">
          <AvailabilityComp
            timePerWeek={project?.role?.hoursPerWeek || undefined}
            seed={project?.role?.budget?.perHour || undefined}
          />

          <p className="font-medium normal-case text-gray-400">
            🗓 1 season (4 month)
          </p>
        </div>
        <GreenStepper steps={STEPS_DATA} />
        <div className="mt-4 flex items-center justify-between pr-2 pl-6">
          <div className="flex w-4/5">
            <SocialMediaComp
              title=""
              links={project?.info?.collaborationLinks?.map((item) => ({
                name: item?.title,
                url: item?.link,
              }))}
            />
          </div>
          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            radius="rounded"
            variant={`secondary`}
          >
            More
          </Button>
        </div>
      </Card>
      <ApplicationModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        project={project}
      />
    </>
  );
};
