import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_NODES } from "@eden/package-graphql";
import {
  Maybe,
  Mutation,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  Card,
  CreateProjectViews1,
  CreateProjectViews2,
  CreateProjectViews6,
  CreateProjectViews7,
  Loading,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";

const ADD_NODES_PROJECT_ROLE = gql`
  mutation ($fields: addNodesToProjectRoleInput!) {
    addNodesToProjectRole(fields: $fields) {
      _id
    }
  }
`;

const LAUNCH_PROJECT = gql`
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

// const CREATE_PROJECT = gql`
//   mutation ($fields: createProjectInput) {
//     createProject(fields: $fields) {
//       _id
//       title
//       role {
//         _id
//       }
//     }
//   }
// `;

import { PROJECT_STEPS } from "@eden/package-ui/utils/enums/fill-project-steps";

export interface ICreateProjectContainerProps {
  state?: Project;
  setState: Dispatch<SetStateAction<any>>;
  step?: string | undefined;
  setStep: Dispatch<SetStateAction<PROJECT_STEPS>>;
  setView?: Dispatch<SetStateAction<"grants" | "profile">>;
  // eslint-disable-next-line no-unused-vars
  // onRoleChange?: (role: RoleType) => void;
  roleIndex: number;
  onSetRoleIndex: Dispatch<SetStateAction<number>>;
}

export const CreateProjectContainer = ({
  state,
  setState,
  step,
  setStep,
  // setView,
  // onRoleChange,
  roleIndex,
  onSetRoleIndex,
}: ICreateProjectContainerProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [battery, setBattery] = useState(5);

  const [addNodes, {}] = useMutation(ADD_NODES_PROJECT_ROLE, {
    onCompleted({ addNodesToProjectRole }: Mutation) {
      if (!addNodesToProjectRole) console.log("addNodesToProjectRole is null");
      // console.log("addNodesToProjectRole", addNodesToProjectRole);
      if (router.query.from)
        router.push(
          `/${router.query.from}?project=${addNodesToProjectRole?._id}`
        );
      else setSubmitting(false);
    },
    onError(error) {
      console.log(error);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [updateProject, {}] = useMutation(LAUNCH_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      setSubmitting(false);
      if (!updateProject) console.log("updateProject is null");
      // console.log("updateProject", updateProject);
      // console.log("state", state);
      updateProject?.role?.forEach((_role: Maybe<RoleType>, index: number) => {
        addNodes({
          variables: {
            fields: {
              nodesID: state?.role ? state?.role[index]?.nodes : [],
              projectRoleID: _role?._id,
            },
          },
        });
      });
    },
    onError(error) {
      setSubmitting(false);
      console.log(error);
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
    console.log("state", state);
    updateProject({
      variables: {
        fields: {
          champion: currentUser?._id,
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
          // budget: { perHour: state[3].hrsWeek, token: "", totalBudget: "" },
          // stepsJoinProject: ["step1", "step2", "step3"],
        },
      },
    });
  };

  const { data: typeProjectNodes } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: "typeProject",
      },
    },
    context: { serviceName: "soilservice" },
  });

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
            battery={battery}
            setBattery={setBattery}
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
            battery={battery}
            setBattery={setBattery}
            onNext={(data) => {
              onNext(data);
              setStep(PROJECT_STEPS.ADD_ROLE);
            }}
            onBack={() => setStep(PROJECT_STEPS.START)}
            projects={typeProjectNodes?.findNodes}
            setProject={setState}
            project={state}
          />
        );
      case PROJECT_STEPS.ADD_ROLE:
        return (
          <CreateProjectViews7
            battery={battery}
            setBattery={setBattery}
            onNext={() => {
              setStep(PROJECT_STEPS.ADD_ANOTHER_ROLE);
            }}
            onChange={(val) => {
              console.log("val", val);
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
    <div>
      <Card shadow className={"h-85 bg-white"}>
        {submitting ? <Loading title={`Submitting...`} /> : stepView()}
      </Card>
    </div>
  );
};
