import { gql, useMutation } from "@apollo/client";
import { LaunchContext, UserContext } from "@context/eden";
import { Maybe, Mutation, Role, ServerTemplate } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  Button,
  Card,
  FormStepper,
  LaunchViewDescribe,
  LaunchViewLinks,
  LaunchViewName,
  LaunchViewRoles,
  LaunchViewSteps,
  LaunchViewSuccess,
  LaunchViewVerify,
  Loading,
} from "ui";

const LAUNCH_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
    }
  }
`;

export interface LaunchPageProps {
  servers: ServerTemplate[];
  roles: Maybe<Array<Maybe<Role>>>;
}

export const LaunchContainer = ({ servers, roles }: LaunchPageProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const {
    projectName,
    projectDescription,
    projectRoles,
    serverId,
    githubUrl,
    discordUrl,
    notionUrl,
    telegramUrl,
  } = useContext(LaunchContext);

  const [currentIndex, setCurrentIndex] = useState(1);
  const maxSteps = 6;

  const [submittingProject, setSubmittingProject] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState("1");

  const [updateProject, {}] = useMutation(LAUNCH_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
      // console.log("updateProject", updateProject);
      setCreatedProjectId(updateProject?._id as string);
      setCurrentIndex(maxSteps + 1);
      setSubmittingProject(false);
    },
    onError(error) {
      console.log(error);
    },
  });

  const onClickLaunch = () => {
    updateProject({
      variables: {
        fields: {
          serverID: serverId,
          champion: currentUser?._id,
          title: projectName,
          description: projectDescription,
          role: projectRoles,
          collaborationLinks: [
            {
              title: "github",
              link: githubUrl,
            },
            {
              title: "discord",
              link: discordUrl,
            },
            {
              title: "notion",
              link: notionUrl,
            },
            {
              title: "telegram",
              link: telegramUrl,
            },
          ],
          budget: { perHour: "", token: "", totalBudget: "" },
          stepsJoinProject: ["step1", "step2", "step3"],
        },
      },
    });
  };

  const LaunchView = () => {
    switch (currentIndex) {
      case 1:
        return <LaunchViewName />;
      case 2:
        return <LaunchViewDescribe />;
      case 3:
        return <LaunchViewRoles roles={roles} />;
      case 4:
        return <LaunchViewLinks servers={servers} />;
      case 5:
        return <LaunchViewSteps />;
      case 6:
        return <LaunchViewVerify />;
      case 7:
        return <LaunchViewSuccess />;
      default:
        return <div>error</div>;
    }
  };

  return (
    <Card shadow className="h-8/10 bg-white">
      {submittingProject ? (
        <Loading title={`Submitting...`} />
      ) : (
        <div className={`relative h-full`}>
          <div className={`p-6`}>
            {currentIndex <= maxSteps && (
              <FormStepper
                currentStep={currentIndex}
                numberofSteps={maxSteps}
              />
            )}
          </div>

          {/* view window */}
          {LaunchView && LaunchView()}

          {/* bottom navigation */}
          <div className={`absolute bottom-2 flex w-full justify-between p-6`}>
            <div>
              {currentIndex !== 1 && currentIndex !== maxSteps + 1 && (
                <Button onClick={() => setCurrentIndex(currentIndex - 1)}>
                  <BsArrowLeft className={`my-auto mr-2`} />
                  PREVIOUS
                </Button>
              )}
            </div>
            <div>
              {currentIndex < maxSteps ? (
                <Button
                  variant={`primary`}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  NEXT
                  <BsArrowRight className={`my-auto ml-2`} />
                </Button>
              ) : currentIndex === maxSteps ? (
                <Button
                  variant={`primary`}
                  onClick={() => {
                    setSubmittingProject(true);
                    onClickLaunch();
                  }}
                >
                  FINISH
                  <BsArrowRight className={`my-auto ml-2`} />
                </Button>
              ) : (
                <Button
                  variant={`primary`}
                  onClick={() =>
                    router.push(`/champion-board/recruit/${createdProjectId}`)
                  }
                >
                  FIND TALENT
                  <BsArrowRight className={`my-auto ml-2`} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
