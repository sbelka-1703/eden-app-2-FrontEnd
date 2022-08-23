// import { Project } from "@graphql/eden/generated";

import { ProjectCard } from "../../cards";

export interface ProjectListProps {
  projects?: any;
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  // console.log("projects", projects);
  return (
    <div>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCard
              _id={project._id}
              title={project.title || ""}
              description={project.description || ""}
              avatar={project?.avatar || ""}
              percentage={project?.percentage || 0}
              position={project?.position || ""}
            />
          </div>
        ))}
    </div>
  );
};
