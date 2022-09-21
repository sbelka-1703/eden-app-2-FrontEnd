import {
  MatchProjectsToMemberOutput,
  Maybe,
  Project,
  RoleTemplate,
} from "@graphql/eden/generated";
import { ApplyByRoleContainer, ProjectMatchList, SignUpCard } from "ui";

export interface ISignUpContainerMainProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  matchedProjects?: Maybe<Array<Maybe<MatchProjectsToMemberOutput>>>;
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
  return (
    <div className={``}>
      {project ? (
        <ApplyByRoleContainer project={project} refetch={refetchProject} />
      ) : (
        <>
          <SignUpCard roles={roles} refetch={refetchMatch} />
          <div className={"mt-6"}>
            <ProjectMatchList
              roles={roles}
              matchedProjects={matchedProjects}
              onSelectedProject={onSelectedProject}
            />
          </div>
        </>
      )}
    </div>
  );
};
