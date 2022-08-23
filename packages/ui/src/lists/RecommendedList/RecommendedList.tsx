import { ProjectCardSmall } from "ui";

export interface RecommendedListProps {
  projects?: any;
}

export const RecommendedList = ({ projects }: RecommendedListProps) => {
  //   console.log("projects", projects);
  return (
    <div>
      <div className={`text-darkGreen text-2xl font-medium`}>Recommended</div>
      <div className={`h-8/10 overflow-y-scroll`}>
        {projects &&
          projects.map((project: any, index: number) => (
            <div key={index} className="my-4">
              <ProjectCardSmall
                title={project.title || ""}
                description={project.description || ""}
                avatar={project?.avatar || ""}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
