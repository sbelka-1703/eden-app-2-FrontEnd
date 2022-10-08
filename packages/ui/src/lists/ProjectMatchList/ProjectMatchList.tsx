import { UserContext } from "@eden/package-context";
import {
  MatchSkillsToProjectsOutput,
  Maybe,
} from "@eden/package-graphql/generated";
import { Loading, ProjectMatchCard, TextHeading3 } from "@eden/package-ui";
import { useContext } from "react";

export interface IProjectMatchListProps {
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
}

export const ProjectMatchList = ({
  matchedProjects,
  onSelectedProject,
}: IProjectMatchListProps) => {
  const { currentUser } = useContext(UserContext);

  // if (matchedProjects) console.log("matchedProjects", matchedProjects);

  return (
    <div className={`h-9/10 flex flex-col rounded-2xl bg-white py-6`}>
      <div className={`px-6`}>
        {currentUser?.memberRole?.title && (
          <TextHeading3>
            Project matches
            {/* All projects for the role {currentUser?.memberRole?.title} */}
          </TextHeading3>
        )}
      </div>
      {matchedProjects ? (
        <div
          className={`scrollbar-hide mt-8 grid grow grid-cols-1 gap-8 overflow-y-scroll px-6 sm:grid-cols-2 xl:grid-cols-3`}
        >
          {matchedProjects?.map((matchProject, index: number) => (
            <ProjectMatchCard
              key={index}
              matchProject={matchProject}
              onSelected={(project) =>
                onSelectedProject(project?.project?._id || "")
              }
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
