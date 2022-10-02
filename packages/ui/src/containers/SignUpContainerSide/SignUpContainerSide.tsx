import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Project,
} from "@eden/package-graphql/generated";
import { Avatar, Card, UserProfileCard } from "@eden/package-ui";
import { useState } from "react";

import { round } from "../../../utils";

export interface ISignUpContainerSideProps {
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  project?: Project;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
}

export const SignUpContainerSide = ({
  matchedProjects,
  project,
  onSelectedProject,
}: ISignUpContainerSideProps) => {
  // if (matchedProjects) console.log("matchedProjects", matchedProjects);
  // if (project) console.log("project", project);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className={`h-9/10`}>
      <UserProfileCard />
      {project && (
        <div className={`h-6/10 scrollbar-hide mt-4 overflow-y-scroll`}>
          {matchedProjects?.map((matchProject, index: number) => (
            <button
              key={index}
              className={`my-2 flex w-full px-1`}
              onClick={() => {
                onSelectedProject(matchProject?.project?._id || "");
                setSelectedProject(matchProject?.project?._id || "");
              }}
            >
              <Card
                focused={matchProject?.project?._id === selectedProject}
                className={`flex w-full  bg-white p-4`}
              >
                <div className={`relative`}>
                  <Avatar isProject size={`xs`} />
                  {matchProject?.matchPercentage && (
                    <p className="font-poppins absolute -mt-6 ml-5 rounded-full bg-white px-1 text-xs font-semibold text-[#9B67FF]">
                      {round(Number(matchProject?.matchPercentage), 0)}%
                    </p>
                  )}
                </div>
                <div className={`pl-6`}>
                  <div>{matchProject?.project?.title}</div>
                  <div className={`text-xs`}>
                    {matchProject?.project?.description}
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
