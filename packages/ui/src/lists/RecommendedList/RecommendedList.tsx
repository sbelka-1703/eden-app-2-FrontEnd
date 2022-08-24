import { Project } from "@graphql/eden/generated";
import { ProjectCardSmall } from "ui";

export interface RecommendedListProps {
  projects?: Project[];
}

export const RecommendedList = ({ projects }: RecommendedListProps) => {
  return (
    <div>
      <div className={`text-darkGreen text-2xl font-medium`}>Recommended</div>
      <div className={`h-8/10 overflow-y-scroll`}>
        {projects &&
          projects.map((project: any, index: number) => (
            <div key={index} className="my-4">
              <ProjectCardSmall
                project={
                  project.__typename === "Project"
                    ? project
                    : project.projectData
                }
                avatar={project?.avatar || ""}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
