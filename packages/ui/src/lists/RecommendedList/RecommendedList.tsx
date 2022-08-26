import { Project } from "@graphql/eden/generated";
import { IFavoriteProps, ProjectRecommendedCard } from "ui";

export interface RecommendedListProps {
  projects?: Project[];
  // eslint-disable-next-line no-unused-vars
  onUpdateFavorite?: ({ id, favorite }: IFavoriteProps) => void;
}

export const RecommendedList = ({
  projects,
  onUpdateFavorite,
}: RecommendedListProps) => {
  return (
    <div>
      <div className={`text-darkGreen text-2xl font-medium`}>Recommended</div>
      <div className={`h-8/10 overflow-y-scroll`}>
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
                onUpdateFavorite={onUpdateFavorite}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
