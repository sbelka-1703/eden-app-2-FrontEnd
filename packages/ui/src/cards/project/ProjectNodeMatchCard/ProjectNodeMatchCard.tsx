import {
  MatchProjectRoles,
  MatchSkillsToProjectsOutput,
  Maybe,
  TeamType,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CommonServerAvatarList,
  //   Favorite,
  LongText,
  ProjectNodeMatchModal,
  SocialMediaComp,
  TextHeading3,
  TextLabel2,
} from "@eden/package-ui";
import { useState } from "react";

import { round } from "../../../../utils";

export interface IProjectNodeMatchCardProps {
  matchedProject: MatchSkillsToProjectsOutput;
  onOpen?: (() => void) | null;
}

export const ProjectNodeMatchCard = ({
  matchedProject,
}: IProjectNodeMatchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isFavorite, setIsFavorite] = useState(false);
  const { project, matchPercentage, projectRoles } = matchedProject;

  if (!project) return null;

  return (
    <Card border>
      <div className={`flex justify-center`}>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <div className="relative">
              <Avatar
                isProject
                emoji={project?.emoji || ""}
                backColorEmoji={project?.backColorEmoji || ""}
              />
              {matchPercentage && (
                <div
                  className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
                >
                  {String(round(matchPercentage, 0))}%
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <TextHeading3>{project?.title}</TextHeading3>
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-2">
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <TextHeading3 className="text-sm  text-gray-600">
          {project?.descriptionOneLine}
        </TextHeading3>

        {project?.collaborationLinks && (
          <SocialMediaComp
            size="sm"
            title=""
            links={project?.collaborationLinks.map((social) => ({
              name: social?.title?.toLowerCase() || "",
              url: social?.link?.toLowerCase() || "",
            }))}
          />
        )}
      </div>
      <div className="flex">
        <LongText
          cutText={100}
          text={project?.description as string}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>
      {project?.serverID && (
        <CommonServerAvatarList
          label={`common servers`}
          size={`xs`}
          serverID={project?.serverID as string[]}
        />
      )}
      <TextLabel2>🛠 Relevant Roles</TextLabel2>
      <div>
        {projectRoles?.map((role: Maybe<MatchProjectRoles>, index: number) => (
          <Badge
            text={role?.projectRole?.title || ""}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      {project?.team && (
        <>
          <TextLabel2>👯‍♂️ Core Team</TextLabel2>
          <div className="flex w-full flex-nowrap">
            {project?.team?.map((member: Maybe<TeamType>, index: number) => (
              <div key={index}>
                {member?.phase === "committed" && (
                  <div className={`-mr-3`}>
                    <Avatar
                      size={`xs`}
                      src={member?.memberInfo?.discordAvatar || ""}
                      alt={member?.memberInfo?.discordName || ""}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div> */}
      <ProjectNodeMatchModal
        matchedProject={matchedProject}
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};
