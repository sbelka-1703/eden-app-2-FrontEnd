import { gql, useMutation } from "@apollo/client";
import { UserProvider } from "@eden/package-context";
import { Mutation } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  CreateProjectViews1,
  CreateProjectViews2,
  CreateProjectViews3,
  CreateProjectViews4,
  CreateProjectViews5,
  CreateProjectViews6,
  GridItemSix,
  GridLayout,
  SEO,
} from "@eden/package-ui";
import { useEffect, useState } from "react";

import { NextPageWithLayout } from "../../_app";

const LAUNCH_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
    }
  }
`;

const FillProfilePage: NextPageWithLayout = () => {
  const [step, setStep] = useState(1);

  const [state, setState] = useState<any>({});

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

  const onClickLaunch = () => {
    updateProject({
      variables: {
        fields: {
          title: state[1].name,
          emoji: state[1].emoji,
          descriptionOneLine: state[1].description,
          // tags: state[1].tags,
          backColorEmoji: state[1].color,
          description: state[2].description,
          // username: state[2].username,
          // role: state[2].selectedRole,
          budget: { perHour: state[5].hrsWeek, token: "", totalBudget: "" },
          stepsJoinProject: ["step1", "step2", "step3"],
        },
      },
    });
  };

  const stepView = () => {
    switch (step) {
      case 1:
        return <CreateProjectViews1 data={state[1]} onNext={onNext} />;

      case 2:
        return (
          <CreateProjectViews2
            onNext={onNext}
            onBack={() => setStep((prev) => prev - 1)}
          />
        );
      case 3:
        return (
          <CreateProjectViews3
            onNext={onNext}
            onSkip={() => setStep((prev) => prev + 1)}
            onBack={() => setStep((prev) => prev - 1)}
          />
        );
      case 4:
        return (
          <CreateProjectViews4
            onNext={onNext}
            onBack={() => setStep((prev) => prev - 1)}
          />
        );
      case 5:
        return (
          <CreateProjectViews5
            onNext={onNext}
            onBack={() => setStep((prev) => prev - 1)}
          />
        );
      case 6:
        return (
          <CreateProjectViews6
            onNext={() => null}
            onLaunch={onClickLaunch}
            onNewPosition={() => null}
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
        <GridItemSix>{stepView()}</GridItemSix>

        <GridItemSix>
          <div />
        </GridItemSix>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => (
  <AppUserLayout>
    <UserProvider>{page}</UserProvider>
  </AppUserLayout>
);

export default FillProfilePage;
