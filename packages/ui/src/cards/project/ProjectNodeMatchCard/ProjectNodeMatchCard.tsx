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

  console.log("matchedProject", matchedProject);

  if (!project) return null;
  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div>
          {/* <Favorite
            favorite={isFavorite}
            onFavorite={() => setIsFavorite((favorite) => !favorite)}
          /> */}
        </div>
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
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
          {/* <Button onClick={() => console.log("more button")}>More</Button> */}
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
      <div className={`font-Inter text-sm text-zinc-500`}>🛠 Relevant Roles</div>
      <div>
        {projectRoles?.map((role: Maybe<MatchProjectRoles>, index: number) => (
          <Badge
            text={role?.projectRole?.title || ""}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Core Team
      </div>
      <div className="flex w-full flex-nowrap">
        {project?.team &&
          project?.team?.map((member: Maybe<TeamType>, index: number) => (
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
