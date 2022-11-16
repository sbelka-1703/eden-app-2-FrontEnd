import { Maybe, ProjectMatchType } from "@eden/package-graphql/generated";

import { ProjectRecommendedCard } from "../../cards/project/ProjectRecommendedCard/ProjectRecommendedCard";

export interface RecommendedListProps {
  projects?: Maybe<Array<Maybe<ProjectMatchType>>>;
}

export const RecommendedList = ({ projects }: RecommendedListProps) => {
  return (
    <div>
      <div className={`text-darkGreen text-2xl font-medium`}>Recommended</div>
      <div className={`h-8/10 scrollbar-hide overflow-y-scroll px-2`}>
        {projects &&
          projects.map((project: any, index: number) => (
            <div key={index} className="my-4">
              <ProjectRecommendedCard
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
