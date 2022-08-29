import { gql, useMutation } from "@apollo/client";
import { LaunchContext, UserContext } from "@context/eden";
import { Mutation } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  Button,
  Card,
  LaunchViewDescribe,
  LaunchViewLinks,
  LaunchViewName,
  LaunchViewRoles,
  LaunchViewSteps,
  LaunchViewSuccess,
  LaunchViewVerify,
} from "ui";

const LAUNCH_PROJECT = gql`
  mutation ($fields: updateProjectInput!) {
    updateProject(fields: $fields) {
      _id
    }
  }
`;

export interface LaunchPageProps {}

export const LaunchContainer = ({}: LaunchPageProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { projectName, projectDescription } = useContext(LaunchContext);

  const [currentIndex, setCurrentIndex] = useState(1);
  const maxSteps = 6;

  const [submittingProject, setSubmittingProject] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState("1");

  const [updateProject, {}] = useMutation(LAUNCH_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
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
          serverID: "alpha-test",
          champion: currentUser?._id,
          title: projectName,
          description: projectDescription,
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
        return <LaunchViewRoles />;
      case 4:
        return <LaunchViewLinks />;
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
        <div>submiting project</div>
      ) : (
        <div className={`relative h-full`}>
          launch step: {currentIndex}
          {LaunchView && LaunchView()}
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
