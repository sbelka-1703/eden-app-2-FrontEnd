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
  AppUserLayout,
  CreateProjectViews1,
  CreateProjectViews2,
  CreateProjectViews6,
  CreateProjectViews7,
  GridItemSix,
  GridLayout,
  Loading,
  SEO,
  ViewProjectContainer,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { NextPageWithLayout } from "../_app";

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

const FillProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [project, setProject] = useState<Project>();
  const projectRoleLength = project?.role?.length;

  const [state, setState] = useState<any>({});

  const [battery, setBattery] = useState(5);

  const [addNodes, {}] = useMutation(ADD_NODES_PROJECT_ROLE, {
    onCompleted({ addNodesToProjectRole }: Mutation) {
      if (!addNodesToProjectRole) console.log("addNodesToProjectRole is null");
      console.log("addNodesToProjectRole", addNodesToProjectRole);
      router.push(
        `/${router.query.from}?project=${addNodesToProjectRole?._id}`
      );
    },
    onError(error) {
      console.log(error);
    },
  });

  const [updateProject, {}] = useMutation(LAUNCH_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      setSubmitting(false);
      setStep(0);
      if (!updateProject) console.log("updateProject is null");
      console.log("updateProject", updateProject);
      // router.push(`/${router.query.from}?project=${updateProject?._id}`);
      updateProject?.role?.forEach((_role: Maybe<RoleType>, index: number) => {
        addNodes({
          variables: {
            fields: {
              nodesID: state[3][index].nodes.map((node: any) => node._id),
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

  const onNext = (data: any) => {
    setState((prev: any) => ({ ...prev, [step]: data }));
    setStep((prev) => prev + 1);
  };

  const roleOnNext = (data: any) => {
    setState((prev: any) => ({
      ...prev,
      [step]: state[step] ? [...state[step], data] : [data],
    }));
    setStep((prev) => prev + 1);
  };

  const onClickLaunch = () => {
    setSubmitting(true);
    updateProject({
      variables: {
        fields: {
          champion: currentUser?._id,
          title: state[1].name,
          emoji: state[1].emoji,
          backColorEmoji: state[1].color,
          descriptionOneLine: state[1].description,
          // tags: state[1].tags,
          description: state[2].description,
          // username: state[2].username,
          role: state[3].map((role: RoleType) => ({
            title: role.title,
            description: role.description,
          })),
          // budget: { perHour: state[3].hrsWeek, token: "", totalBudget: "" },
          stepsJoinProject: ["step1", "step2", "step3"],
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
      case 1:
        return (
          <CreateProjectViews1
            battery={battery}
            setBattery={setBattery}
            data={state[1]}
            onNext={onNext}
            setProject={setProject}
            project={project}
          />
        );

      case 2:
        return (
          <CreateProjectViews2
            battery={battery}
            setBattery={setBattery}
            onNext={onNext}
            projects={typeProjectNodes?.findNodes}
            onBack={() => setStep((prev) => prev - 1)}
            setProject={setProject}
            project={project}
          />
        );
      case 3:
        return (
          <CreateProjectViews7
            battery={battery}
            setBattery={setBattery}
            onNext={roleOnNext}
            expertise={expertiseNodes?.findNodes}
            onBack={() => setStep((prev) => prev - 1)}
            setProject={setProject}
            project={project}
            roleIndex={projectRoleLength}
          />
        );
      case 4:
        return (
          <CreateProjectViews6
            onNext={onClickLaunch}
            onLaunch={onClickLaunch}
            onNewPosition={() => setStep((prev) => prev - 1)}
            onBack={() => setStep((prev) => prev - 1)}
          />
        );

      default:
        <div />;
        break;
    }
  };

  useEffect(() => {
    console.info({ state });
  }, [state]);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className={`h-85 scrollbar-hide overflow-y-scroll `}>
          {submitting ? <Loading title={`Submitting...`} /> : stepView()}
        </GridItemSix>

        <GridItemSix>
          <ViewProjectContainer step={String(step)} project={project} />
        </GridItemSix>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default FillProfilePage;
