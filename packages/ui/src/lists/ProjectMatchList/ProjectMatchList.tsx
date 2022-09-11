import { Project } from "@graphql/eden/generated";
import { ProjectMatchCard, TextHeading2 } from "ui";

export interface IProjectMatchListProps {
  projects: Project[];
}

export const ProjectMatchList = ({ projects }: IProjectMatchListProps) => {
  return (
    <div>
      <TextHeading2>All projects for the role Scrum Master</TextHeading2>
      <div className={`mt-8 grid grid-cols-3 gap-8`}>
        {projects.map((project, index: number) => (
          <ProjectMatchCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};
