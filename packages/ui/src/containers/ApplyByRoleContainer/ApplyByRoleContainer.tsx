import { Project } from "@graphql/eden/generated";
import { ProjectInfo, RoleCard, TextHeading1 } from "ui";

export interface IApplyByRoleContainerProps {
  project?: Project;
}

export const ApplyByRoleContainer = ({
  project,
}: IApplyByRoleContainerProps) => {
  //   if (project) console.log(project);
  return (
    <div className={`text-darkGreen h-8/10 rounded-2xl bg-white px-6 py-6`}>
      <ProjectInfo project={project} isFavoriteButton />
      <div>
        <div className={`my-6`}>
          <TextHeading1>Matching Open Roles</TextHeading1>
        </div>
        <div className={`grid grid-cols-3 space-x-6 `}>
          {project?.role?.map((role, index) => (
            <RoleCard key={index} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};
