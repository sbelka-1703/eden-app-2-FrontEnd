import {
  Maybe,
  Project,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import { ProjectCard } from "ui";

export interface ProjectListProps {
  projects?: Project[] | Maybe<ProjectMemberType>[];
  applyButton?: boolean;
  statusButton?: boolean;
  inviteButton?: boolean;
  favButton?: boolean;
}

export const ProjectList = ({
  projects,
  applyButton,
  statusButton,
  inviteButton,
  favButton,
}: ProjectListProps) => {
  // console.log("projects", projects);
  const projectType = (project: any) => {
    if (project.__typename === "Project") {
      return project;
    } else if (project.__typename === "projectMemberType") {
      return project.info;
    } else {
      return project?.projectData;
    }
  };

  return (
    <div className={``}>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCard
              project={projectType(project)}
              avatar={project?.avatar || ""}
              percentage={
                project.__typename === "projectMatchType"
                  ? project.matchPercentage
                  : null
              }
              position={project?.position || ""}
              applyButton={applyButton}
              statusButton={statusButton}
              inviteButton={inviteButton}
              favButton={favButton}
            />
          </div>
        ))}
    </div>
  );
};
