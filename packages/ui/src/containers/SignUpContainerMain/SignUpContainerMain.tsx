import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Project,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import {
  ApplyByRoleContainer,
  ProjectMatchList,
  SignUpRoleSelectCard,
} from "@eden/package-ui";
import { useState } from "react";

export interface ISignUpContainerMainProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  project?: Project;
  refetchMatch?: () => void;
  refetchProject?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
  loadingProject?: boolean;
  viewProject?: boolean;
  // eslint-disable-next-line no-unused-vars
  onViewProject: (val: boolean) => void;
}

export const SignUpContainerMain = ({
  roles,
  matchedProjects,
  project,
  refetchMatch,
  refetchProject,
  onSelectedProject,
  loadingProject,
  viewProject,
  onViewProject,
}: ISignUpContainerMainProps) => {
  // console.log("project", project);

  const [roleSelected, setRoleSelected] = useState(false);

  // if (!project || !matchedProjects || loadingProject)
  //   return <div className={`h-85`}></div>;

  return (
    <div className={`h-85`}>
      {viewProject ? (
        <>
          {project && matchedProjects && (
            <ApplyByRoleContainer
              project={project}
              matchedProjects={matchedProjects}
              refetch={refetchProject}
              loadingProject={loadingProject}
              onViewProject={onViewProject}
            />
          )}
        </>
      ) : (
        <>
          {!roleSelected ? (
            <SignUpRoleSelectCard
              roles={roles}
              refetch={refetchMatch}
              onNext={() => setRoleSelected(true)}
            />
          ) : (
            <div className={``}>
              <ProjectMatchList
                matchedProjects={matchedProjects}
                onSelectedProject={onSelectedProject}
                loadingProject={loadingProject}
                // eslint-disable-next-line no-unused-vars
                onViewProject={(val: boolean) => onViewProject(val)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
