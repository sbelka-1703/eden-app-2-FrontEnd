import { gql, useMutation, useQuery } from "@apollo/client";
import { FIND_NODES } from "@eden/package-graphql";
import {
  Maybe,
  Mutation,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import { project } from "@eden/package-mock";
import {
  Card,
  CreateProjectViews1,
  CreateProjectViews2,
  CreateProjectViews6,
  CreateProjectViews7,
  Loading,
} from "@eden/package-ui";
import { PROJECT_STEPS } from "@eden/package-ui/utils/enums/fill-project-steps";
import { getFillProjectPercentage } from "@eden/package-ui/utils/fill-project-percentage";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const UPDATE_NODES_PROJECT_ROLE = gql`
  mutation ($fields: updateNodesToProjectRoleInput!) {
    updateNodesToProjectRole(fields: $fields) {
      _id
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation ($fields: createProjectInput) {
    createProject(fields: $fields) {
      _id
      title
      role {
        _id
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
      title
      role {
        _id
      }
    }
  }
`;

export interface ICreateProjectContainerProps {
  state?: Project;
  setState: Dispatch<SetStateAction<any>>;
  step?: string | undefined;
  setStep: Dispatch<SetStateAction<PROJECT_STEPS>>;
  setView?: Dispatch<SetStateAction<"main" | "project">>;
  roleIndex: number;
  onSetRoleIndex: Dispatch<SetStateAction<number>>;
  refetchProject: () => void;
}

export const CreateProjectContainer = ({
  state,
  setState,
  step,
  setStep,
  setView,
  roleIndex,
  onSetRoleIndex,
  refetchProject,
}: ICreateProjectContainerProps) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [addNodes, {}] = useMutation(UPDATE_NODES_PROJECT_ROLE, {
    onCompleted({ updateNodesToProjectRole }: Mutation) {
      if (!updateNodesToProjectRole)
        console.log("updateNodesToProjectRole is null");
      // console.log("updateNodesToProjectRole", updateNodesToProjectRole);
      if (router.query.from)
        router.push(
          `/${router.query.from}?project=${updateNodesToProjectRole?._id}`
        );
      else {
        setSubmitting(false);
        setView && setView("main");
        refetchProject();
        router.push(`/champion-board/recruit/${updateNodesToProjectRole?._id}`);
      }
    },
    onError(error) {
      setSubmitting(false);
      toast.error(error.message);
    },
  });

  const [createProject, {}] = useMutation(CREATE_PROJECT, {
    onCompleted({ createProject }: Mutation) {
      if (!createProject) console.log("createProject is null");
      // console.log("createProject", createProject);
      createProject?.role?.forEach((_role: Maybe<RoleType>, index: number) => {
        addNodes({
          variables: {
            fields: {
              nodesID:
                state?.role && state?.role[index]?.nodes
                  ? state?.role[index]?.nodes
                  : [],
              projectRoleID: _role?._id,
              nodeType: `sub_expertise`,
            },
          },
          context: { serviceName: "soilservice" },
        });
      });
    },
    onError(error) {
      setSubmitting(false);
      toast.error(error.message);
    },
  });

  const [updateProject, {}] = useMutation(UPDATE_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
      updateProject?.role?.forEach((_role: Maybe<RoleType>, index: number) => {
        addNodes({
          variables: {
            fields: {
              nodesID:
                state?.role && state?.role[index]?.nodes
                  ? state?.role[index]?.nodes
                  : [],
              projectRoleID: _role?._id,
              nodeType: `sub_expertise`,
            },
          },
          context: { serviceName: "soilservice" },
        });
      });
    },
    onError(error) {
      setSubmitting(false);
      toast.error(error.message);
    },
  });

  const onNext = (data: Project) => {
    setState((prev: Project) => ({
      ...prev,
      ...data,
    }));
  };

  const onClickLaunch = () => {
    setSubmitting(true);

    if (state?._id) {
      // console.log("state", state);
      updateProject({
        variables: {
          fields: {
            _id: state?._id,
            title: state?.title,
            emoji: state?.emoji,
            backColorEmoji: state?.backColorEmoji,
            descriptionOneLine: state?.descriptionOneLine,
            description: state?.description,
            role: state?.role?.map((role) => ({
              _id: role?._id,
              title: role?.title,
              shortDescription: role?.shortDescription,
              description: role?.description,
              benefits: role?.benefits,
              expectations: role?.expectations,
              ratePerHour: role?.ratePerHour,
              openPositions: role?.openPositions,
              hoursPerWeek: role?.hoursPerWeek,
            })),
            serverID: state?.serverID,
          },
        },
        context: { serviceName: "soilservice" },
      });
    } else {
      createProject({
        variables: {
          fields: {
            title: state?.title,
            emoji: state?.emoji,
            backColorEmoji: state?.backColorEmoji,
            descriptionOneLine: state?.descriptionOneLine,
            description: state?.description,
            role: state?.role?.map((role) => ({
              title: role?.title,
              shortDescription: role?.shortDescription,
              description: role?.description,
              benefits: role?.benefits,
              expectations: role?.expectations,
              ratePerHour: role?.ratePerHour,
              openPositions: role?.openPositions,
              hoursPerWeek: role?.hoursPerWeek,
            })),
            serverID: state?.serverID,
          },
        },
        context: { serviceName: "soilservice" },
      });
    }
  };

  const { data: expertiseNodes } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: "expertise",
      },
    },
    context: { serviceName: "soilservice" },
  });

  const stepView = () => {
    switch (step) {
      case PROJECT_STEPS.START:
        return (
          <CreateProjectViews1
            battery={getFillProjectPercentage(project)}
            onNext={(data) => {
              onNext(data);
              setStep(PROJECT_STEPS.DESCRIPTION);
            }}
            setProject={setState}
            project={state}
          />
        );

      case PROJECT_STEPS.DESCRIPTION:
        return (
          <CreateProjectViews2
            battery={getFillProjectPercentage(project)}
            onNext={(data) => {
              onNext(data);
              setStep(PROJECT_STEPS.ADD_ROLE);
            }}
            onBack={() => setStep(PROJECT_STEPS.START)}
            setProject={setState}
            project={state}
          />
        );
      case PROJECT_STEPS.ADD_ROLE:
        return (
          <CreateProjectViews7
            battery={getFillProjectPercentage(project)}
            onNext={() => {
              setStep(PROJECT_STEPS.ADD_ANOTHER_ROLE);
            }}
            onChange={(val) => {
              setState((prev: Project) => ({
                ...prev,
                role: prev.role
                  ? [
                      ...prev.role.slice(0, roleIndex),
                      val,
                      ...prev.role.slice(roleIndex + 1),
                    ]
                  : [val],
              }));
            }}
            expertise={expertiseNodes?.findNodes}
            onBack={() => setStep(PROJECT_STEPS.DESCRIPTION)}
            project={state}
            setProject={setState}
            roleIndex={roleIndex}
          />
        );
      case PROJECT_STEPS.ADD_ANOTHER_ROLE:
        return (
          <CreateProjectViews6
            onLaunch={onClickLaunch}
            onNewPosition={() => {
              onSetRoleIndex(state?.role?.length ? state.role.length : 0);
              setStep(PROJECT_STEPS.ADD_ROLE);
            }}
            onBack={() => setStep(PROJECT_STEPS.ADD_ROLE)}
          />
        );

      default:
        <div />;
        break;
    }
  };

  return (
    <Card shadow className={"h-85 bg-white"}>
      {submitting ? <Loading title={`Submitting...`} /> : stepView()}
    </Card>
  );
};
