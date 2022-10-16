import { Maybe, Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  GreenStepper,
  SocialMediaComp,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";

export interface ApplicationCardProps {
  role?: Maybe<RoleType>;
  project?: Maybe<Project>;
}

const STEPS_DATA = [
  {
    name: "step 1",
    completed: true,
  },
  {
    name: "step 2",
    completed: true,
  },
  {
    name: "step 3",
    completed: false,
  },
  {
    name: "step 4",
    completed: false,
  },
];

export const ApplicationCard = ({ project, role }: ApplicationCardProps) => {
  const router = useRouter();

  return (
    <>
      <Card className={`mb-4 border border-gray-300 bg-white py-3`}>
        <div className="mb-4 flex  px-2">
          <div className="flex h-12 w-12 items-center justify-center">
            <Avatar
              size="xs"
              isProject
              emoji={project?.emoji as string}
              backColorEmoji={project?.backColorEmoji as string}
            />
          </div>
          <div className="ml-2 flex-1 text-left">
            {project?.title && (
              <TextHeading3 className="border-b">{project.title}</TextHeading3>
            )}
            <TextBody>{role?.title}</TextBody>
          </div>
        </div>
        <div className="font-Inter mb-4 px-6 text-left ">
          <p className="font-medium normal-case text-gray-400">
            ⏳ {role?.hoursPerWeek}h / week
          </p>
          <p className="my-2 font-medium normal-case text-gray-400">
            💰 ${role?.budget?.token} {+(role?.budget?.perHour || 0) * 7} / week
          </p>
          <p className="font-medium normal-case text-gray-400">
            🗓 1 season (4 month)
          </p>
        </div>
        <GreenStepper steps={STEPS_DATA} />
        <div className="mt-4 flex items-center justify-between pr-2 pl-6">
          <div className="flex w-4/5">
            <SocialMediaComp
              title=""
              links={project?.collaborationLinks?.map((item) => ({
                name: item?.title,
                url: item?.link,
              }))}
            />
          </div>
          <Button
            radius="rounded"
            variant={`secondary`}
            onClick={() => router.push("/")}
          >
            More
          </Button>
        </div>
      </Card>
    </>
  );
};
