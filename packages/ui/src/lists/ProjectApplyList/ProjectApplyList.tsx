import { ProjectMemberType } from "@eden/package-graphql/generated";
import { ProjectStatusCard } from "@eden/package-ui";

export interface ProjectApplyListProps {
  projects?: ProjectMemberType[];
}

export const ProjectApplyList = ({ projects }: ProjectApplyListProps) => {
  //   console.log("projects", projects);
  return (
    <div>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectStatusCard project={project} roleName={""} />
          </div>
        ))}
    </div>
  );
};
