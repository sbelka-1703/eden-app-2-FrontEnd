import { Project } from "@graphql/eden/generated";
import { IFavoriteProps, ProjectCardSmall } from "ui";

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
              <ProjectCardSmall
                project={
                  project.__typename === "Project"
                    ? project
                    : project.projectData
                }
                avatar={project?.avatar || ""}
                onUpdateFavorite={onUpdateFavorite}
                // onUpdateFavorite={({ id, favorite }) => {
                //   if (id && onUpdateFavorite) {
                //     onUpdateFavorite({ id, favorite });
                //   }
                // }}
                // onUpdateFavorite={({ id, favorite }) => {
                //   console.log("onUpdateFavorite");
                //   console.log("id", id);
                //   console.log("favorite", favorite);
                // }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
