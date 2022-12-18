import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  OpenPositions,
  TextHeading2,
  TimelineStepper,
  UserMiniCard,
} from "@eden/package-ui";

import { round } from "../../../utils";

export interface IProjectNodeMatchInfoProps {
  matchedProject: MatchSkillsToProjectsOutput;
}

export const ProjectNodeMatchInfo = ({
  matchedProject,
}: IProjectNodeMatchInfoProps) => {
  const { project, matchPercentage, projectRoles } = matchedProject;

  if (!project) return null;

  const steps = [
    {
      completed: false,
      date: "APR 21 - JAN 22",
      description: "Launch beta of the platform.",
    },
    {
      completed: false,
      date: "JAN 22 - MAR 22",
      description: "Launch alpha of the platform. Pre-seed: 1 Mil",
    },
    {
      completed: true,
      date: "MAR 22 - JAN 23",
      description: "Launch a native token Seed: 4 Mil",
    },
    {
      completed: false,
      date: "JAN 23 - JAN 24",
      description: "Onboard 5k new devs. Generate first revenue",
    },
  ];

  return (
    <>
      <div className={`mt-4 flex justify-between`}>
        <div className="flex flex-row">
          <div>
            <Avatar
              size="lg"
              isProject
              emoji={project?.emoji as string}
              backColorEmoji={project?.backColorEmoji as string}
            />
          </div>

          <div className={`mx-4`}>
            <TextHeading2>{project?.title}</TextHeading2>
            <div className="text-soilGray/100	font-normal	tracking-wide">
              {project?.descriptionOneLine}
            </div>
            <div>
              {project?.role?.map((role: any, index: number) => (
                <Badge
                  text={role?.title}
                  key={index}
                  className={`bg-soilPurple/20 py-px text-xs`}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={`mt-6`}>
            {matchPercentage && (
              <p className="text-soilPurple font-poppins text-4xl font-semibold">
                {round(matchPercentage, 0)}%
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-3`}>
        <div className={`col-span-2`}>
          <div className={`mt-5 mb-2 flex uppercase`}>
            <p className="text-soilGray/100 font-medium tracking-wide">
              📃 Description of the project
            </p>
          </div>
          <div className="text-sm font-medium tracking-normal">
            {project?.description}
          </div>
        </div>
        <div className={`col-span-1`}>
          <div className={`my-4 flex uppercase`}>
            <p className="text-soilGray/100 font-medium tracking-wide">
              🏆 Champion
            </p>
          </div>
          <UserMiniCard member={project?.champion} />
        </div>
      </div>

      <div className={`w-full p-4`}>
        <TimelineStepper steps={steps} />
      </div>
      <OpenPositions
        project={project}
        matchPercentage={matchPercentage}
        projectRoles={projectRoles}
      />
      {/* {endorsements?.length > 0 && (
        <div className={`my-4 flex`}>
          <p className="text-soilGray/100 font-medium uppercase tracking-wide">
            ⭐️ Reviews
          </p>
        </div>
      )} */}
      <div
        className={`grid grow grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3`}
      >
        {/* {endorsements?.length > 0 && (
          <>
            {endorsements?.map((endorsement: any, index: number) => (
              <div key={index}>
                {index < 3 && <ReviewCard review={endorsement} />}
              </div>
            ))}
          </>
        )} */}
      </div>
    </>
  );
};
