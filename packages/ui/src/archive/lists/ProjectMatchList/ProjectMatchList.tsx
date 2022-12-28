import { UserContext } from "@eden/package-context";
import {
  MatchSkillsToProjectsOutput,
  Maybe,
} from "@eden/package-graphql/generated";
import { Card, Loading, TextHeading3 } from "@eden/package-ui";
import { useContext } from "react";

import { ProjectMatchCard } from "../../cards/project/ProjectMatchCard";

export interface IProjectMatchListProps {
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
  loadingProject?: boolean;
  // eslint-disable-next-line no-unused-vars
  onViewProject: (val: boolean) => void;
}

export const ProjectMatchList = ({
  matchedProjects,
  onSelectedProject,
  loadingProject,
  onViewProject,
}: IProjectMatchListProps) => {
  const { currentUser } = useContext(UserContext);

  // if (matchedProjects) console.log("matchedProjects", matchedProjects);

  return (
    <Card shadow className={`h-85 flex flex-col rounded-2xl bg-white py-6`}>
      <div className={`px-6`}>
        {currentUser?.memberRole?.title && (
          <TextHeading3>Project matches</TextHeading3>
        )}
      </div>
      {matchedProjects && !loadingProject ? (
        <div
          className={`scrollbar-hide mt-8 grid grow grid-cols-1 gap-8 overflow-y-scroll px-6 sm:grid-cols-2 xl:grid-cols-3`}
        >
          {matchedProjects?.map((matchProject, index: number) => (
            <ProjectMatchCard
              key={index}
              matchProject={matchProject}
              onSelected={(project: any) => {
                onSelectedProject(project?.project?._id || "");
                onViewProject(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </Card>
  );
};
