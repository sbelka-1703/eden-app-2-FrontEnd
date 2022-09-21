import { UserContext } from "@context/eden";
import {
  MatchProjectsToMemberOutput,
  Maybe,
  RoleTemplate,
} from "@graphql/eden/generated";
import { useContext } from "react";
import { Loading, ProjectMatchCard, TextHeading2 } from "ui";

export interface IProjectMatchListProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  matchedProjects?: Maybe<Array<Maybe<MatchProjectsToMemberOutput>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
}

export const ProjectMatchList = ({
  roles,
  matchedProjects,
  onSelectedProject,
}: IProjectMatchListProps) => {
  const { currentUser } = useContext(UserContext);

  // if (matchedProjects) console.log("matchedProjects", matchedProjects);

  return (
    <div className={`h-6/10 flex flex-col rounded-2xl bg-white py-6`}>
      <div className={`px-6`}>
        {currentUser?.memberRole?.title && (
          <TextHeading2>
            All projects for the role {currentUser?.memberRole?.title}
          </TextHeading2>
        )}
      </div>
      {matchedProjects ? (
        <div
          className={`scrollbar-hide mt-8 grid grow grid-cols-1 gap-8 overflow-y-scroll px-6 sm:grid-cols-2 xl:grid-cols-3`}
        >
          {matchedProjects?.map((matchProject, index: number) => (
            <ProjectMatchCard
              key={index}
              roles={roles}
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
