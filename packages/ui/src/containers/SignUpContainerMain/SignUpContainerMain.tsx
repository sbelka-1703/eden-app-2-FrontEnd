import { UserContext } from "@eden/package-context";
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
import { useContext } from "react";

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
  const { currentUser } = useContext(UserContext);

  // const [roleSelected, setRoleSelected] = useState(false);

  return (
    <div className={`h-85`}>
      {viewProject ? (
        <ApplyByRoleContainer
          project={project}
          matchedProjects={matchedProjects}
          refetch={refetchProject}
          loadingProject={loadingProject}
          onViewProject={onViewProject}
        />
      ) : (
        <>
          {currentUser?.memberRole?._id ? (
            <ProjectMatchList
              matchedProjects={matchedProjects}
              onSelectedProject={onSelectedProject}
              loadingProject={loadingProject}
              // eslint-disable-next-line no-unused-vars
              onViewProject={(val: boolean) => onViewProject(val)}
            />
          ) : (
            <SignUpRoleSelectCard roles={roles} refetch={refetchMatch} />
          )}
        </>
      )}
    </div>
  );
};
