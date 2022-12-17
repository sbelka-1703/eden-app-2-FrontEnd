import { gql, useMutation, useQuery } from "@apollo/client";
import { Mutation } from "@eden/package-graphql/generated";
import {
  CreateProjectViews1,
  CreateProjectViews2,
  CreateProjectViews6,
  CreateProjectViews7,
  GridItemSix,
  GridLayout,
  SEO,
} from "@eden/package-ui";
import { useEffect, useState } from "react";

import { NextPageWithLayout } from "../_app";

const LAUNCH_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
      title
    }
  }
`;

const FIND_NODES = gql`
  query ($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      node
      subNodes {
        _id
        name
      }
    }
  }
`;

const LaunchPage: NextPageWithLayout = () => {
  const [step, setStep] = useState(1);

  const [state, setState] = useState<any>({});

  const [battery, setBattery] = useState(5);

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

  const onClickLaunch = () => {
    updateProject({
      variables: {
        fields: {
          title: state[1].name,
          emoji: state[1].emoji,
          descriptionOneLine: state[1].description,
          // tags: state[1].tags,
          backColorEmoji: state[1].color,
          description: state[3].description,
          // username: state[2].username,
          // role: state[2].selectedRole,
          budget: { perHour: state[3].hrsWeek, token: "", totalBudget: "" },
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
          />
        );
      case 3:
        return (
          <CreateProjectViews7
            battery={battery}
            setBattery={setBattery}
            onNext={onNext}
            expertise={expertiseNodes?.findNodes}
            onBack={() => setStep((prev) => prev - 1)}
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
          {stepView()}
        </GridItemSix>

        <GridItemSix>
          <div />
        </GridItemSix>
      </GridLayout>
    </>
  );
};

export default LaunchPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
