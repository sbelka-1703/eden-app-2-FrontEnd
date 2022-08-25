import { Project } from "@graphql/eden/generated";
import { ProjectCard } from "ui";

export interface ProjectListProps {
  projects?: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCard
              project={
                project.__typename === "Project" ? project : project.projectData
              }
              avatar={project?.avatar || ""}
              percentage={
                project.__typename === "projectMatchType"
                  ? project.matchPercentage
                  : null
              }
              position={project?.position || ""}
            />
          </div>
        ))}
    </div>
  );
};
