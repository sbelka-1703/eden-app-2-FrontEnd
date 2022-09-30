import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Project,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import { ApplyByRoleContainer, ProjectMatchList, SignUpCard } from "ui";

export interface ISignUpContainerMainProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  project?: Project;
  refetchMatch?: () => void;
  refetchProject?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
}

export const SignUpContainerMain = ({
  roles,
  matchedProjects,
  project,
  refetchMatch,
  refetchProject,
  onSelectedProject,
}: ISignUpContainerMainProps) => {
  // console.log("project", project);
  return (
    <div className={``}>
      {project ? (
        <ApplyByRoleContainer
          project={project}
          matchedProjects={matchedProjects}
          refetch={refetchProject}
        />
      ) : (
        <>
          <SignUpCard roles={roles} refetch={refetchMatch} />
          <div className={"mt-6"}>
            <ProjectMatchList
              matchedProjects={matchedProjects}
              onSelectedProject={onSelectedProject}
            />
          </div>
        </>
      )}
    </div>
  );
};
