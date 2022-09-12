import { UserContext } from "@context/eden";
import { Maybe, ProjectMatchType } from "@graphql/eden/generated";
import { useContext } from "react";
import { ProjectMatchCard, TextHeading2 } from "ui";

export interface IProjectMatchListProps {
  projects: Maybe<Array<Maybe<ProjectMatchType>>>;
}

export const ProjectMatchList = ({ projects }: IProjectMatchListProps) => {
  const { currentUser } = useContext(UserContext);

  // console.log(projects);
  return (
    <div className={`h-6/10 flex flex-col rounded-2xl bg-white py-6`}>
      <div className={`px-6`}>
        {currentUser?.memberRole?.title && (
          <TextHeading2>
            All projects for the role {currentUser?.memberRole?.title}
          </TextHeading2>
        )}
      </div>
      <div
        className={`scrollbar-hide mt-8 grid grow grid-cols-1 gap-8 overflow-y-scroll px-6 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {projects &&
          projects.map((project, index: number) => (
            <ProjectMatchCard key={index} project={project} />
          ))}
      </div>
    </div>
  );
};
