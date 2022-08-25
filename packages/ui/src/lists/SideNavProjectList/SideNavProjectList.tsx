// import { Project, Members } from "@graphql/eden/generated";
import { ProjectCardSmall } from "ui";

export interface SideNavProjectListProps {
  projects: any;
}

export const SideNavProjectList = ({ projects }: SideNavProjectListProps) => {
  if (!projects) return null;
  console.log("projects", projects);
  return (
    <div className={`h-8/10 overflow-y-scroll`}>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCardSmall
              project={project.info}
              avatar={project?.avatar || ""}
            />
          </div>
        ))}
    </div>
  );

  //   return (
  //     <div>
  //       <div className={`h-8/10 overflow-y-scroll`}>{projectsList}</div>
  //     </div>
  //   );
};
