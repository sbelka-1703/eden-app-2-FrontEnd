import { gql, useMutation, useQuery } from "@apollo/client";
// import { UserContext } from "@eden/package-context";
import { FIND_NODES } from "@eden/package-graphql";
import { Mutation, Project } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  CreateProjectViews1,
  CreateProjectViews2,
  // CreateProjectViews6,
  // CreateProjectViews7,
  GridItemSix,
  GridLayout,
  SEO,
  // ViewProjectContainer,
} from "@eden/package-ui";
import { useState } from "react";

import { NextPageWithLayout } from "../../_app";

const LAUNCH_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
      title
    }
  }
`;

const FillProfilePage: NextPageWithLayout = () => {
  // const { currentUser } = useContext(UserContext);
  const [step, setStep] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState<any>({});
  const [battery, setBattery] = useState(5);
  const [project, setProject] = useState<Project>();
  // const projectRoleLength = project?.role?.length;
  const [updateProject, {}] = useMutation(LAUNCH_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
      console.log("updateProject", updateProject);
    },
    onError(error) {
      console.log(error);
    },
  });

  const onNext = (data: any) => {
    setState((prev: any) => ({ ...prev, [step]: data }));
    setStep((prev) => prev + 1);
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnLaunch = () => {
    updateProject({
      variables: {
        fields: {
          // serverID: serverId,
          // champion: currentUser?._id,
          title: "test",
          // description: projectDescription,
          // role: projectRoles,
          // collaborationLinks: [
          //   {
          //     title: "github",
          //     link: githubUrl,
          //   },
          //   {
          //     title: "discord",
          //     link: discordUrl,
          //   },
          //   {
          //     title: "notion",
          //     link: notionUrl,
          //   },
          //   {
          //     title: "telegram",
          //     link: telegramUrl,
          //   },
          // ],
          // budget: { perHour: "", token: "", totalBudget: "" },
          // stepsJoinProject: ["step1", "step2", "step3"],
        },
      },
    });
  };

  // const onClickLaunch = () => {
  //   updateProject({
  //     variables: {
  //       fields: {
  //         title: state[1].name,
  //         emoji: state[1].emoji,
  //         descriptionOneLine: state[1].description,
  //         champion: currentUser?._id,
  //         // tags: state[1].tags,
  //         backColorEmoji: state[1].color,
  //         description: state[3].description,
  //         // username: state[2].username,
  //         // role: state[2].selectedRole,
  //         budget: { perHour: state[3].hrsWeek, token: "", totalBudget: "" },
  //         stepsJoinProject: ["step1", "step2", "step3"],
  //       },
  //     },
  //   });
  // };

  const { data: typeProjectNodes } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: "typeProject",
      },
    },
    context: { serviceName: "soilservice" },
  });

  // const { data: expertiseNodes } = useQuery(FIND_NODES, {
  //   variables: {
  //     fields: {
  //       node: "expertise",
  //     },
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  const stepView = () => {
    switch (step) {
      case 1:
        return (
          <CreateProjectViews1
            battery={battery}
            setBattery={setBattery}
            // data={state[1]}
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
          <></>
          // <CreateProjectViews7
          //   battery={battery}
          //   setBattery={setBattery}
          //   onNext={onNext}
          //   expertise={expertiseNodes?.findNodes}
          //   onBack={() => setStep((prev) => prev - 1)}
          //   // setProject={setProject}
          //   project={project}
          //   // roleIndex={projectRoleLength}
          //   // eslint-disable-next-line no-unused-vars
          //   // onChange={function (data: RoleType): void {
          //     // throw new Error("Function not implemented.");
          //   }}
          // />
        );
      case 4:
        return (
          <></>
          // <CreateProjectViews6
          //   onNext={onClickLaunch}
          //   onLaunch={onClickLaunch}
          //   onNewPosition={() => setStep((prev) => prev - 1)}
          //   onBack={() => setStep((prev) => prev - 1)}
          // />
        );

      default:
        <div />;
        break;
    }
  };

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className={`h-85 scrollbar-hide overflow-y-scroll `}>
          {stepView()}
        </GridItemSix>
        <GridItemSix>
          {/* <ViewProjectContainer step={String(step)} project={project} /> */}
        </GridItemSix>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default FillProfilePage;
