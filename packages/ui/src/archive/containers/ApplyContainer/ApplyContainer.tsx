/* eslint-disable react/no-unescaped-entities */
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Project } from "@eden/package-graphql/generated";
import { Avatar, Button, Card, Loading, Modal } from "@eden/package-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface ApplyContainerProps {
  project?: Project;
}

export const ApplyContainer = ({ project }: ApplyContainerProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        console.log("onCompleted");
        setShowModal(true);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  if (!project) return null;
  // console.log("project", project);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      {submitting ? (
        <Loading title={`Submitting Application...`} />
      ) : (
        <div className={`relative h-full`}>
          <div className={`text-2xl font-medium text-black/80`}>
            Magic Application
          </div>
          <div className={`mt-8 flex`}>
            <Avatar
              src={``}
              isProject
              emoji={project?.emoji as string}
              backColorEmoji={project?.backColorEmoji as string}
            />
            <div className={`pl-8`}>
              <div className={`text-darkGreen text-2xl font-bold`}>
                {project.title}
              </div>
              <div>
                ⚡
                <span className={`text-soilPurple text-3xl font-semibold`}>
                  %
                </span>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-2 flex w-full justify-between`}>
            <Button onClick={() => router.back()}>
              <span className={`my-auto pl-2`}>
                <BsArrowLeft />
              </span>
              Go Back
            </Button>

            <Button
              variant={`primary`}
              onClick={() => {
                setSubmitting(true);
                changeTeamMember_Phase_Project({
                  variables: {
                    fields: {
                      projectID: project._id,
                      memberID: currentUser?._id,
                      // roleID, // TODO: roleID is needed here
                      phase: "engaged",
                    },
                  },
                });
              }}
            >
              Apply Now
              <span className={`my-auto pl-2`}>
                <BsArrowRight />
              </span>
            </Button>
          </div>
        </div>
      )}
      <Modal open={showModal} closeOnEsc={false}>
        <div className={`font-poppins my-4 text-center text-3xl font-bold`}>
          🎉 Application Successful!
        </div>
        <div className={`text-black/50`}>
          You've successfully applied for this project. The champion will send
          you a message through discord with news on next steps within a week.
        </div>
        <div className={`mx-auto mt-12 flex justify-center`}>
          <Button
            variant={`primary`}
            onClick={() => router.push(`/applications`)}
          >
            View Your Applications
          </Button>
        </div>
        <Link href={`/projects`}>
          <div
            className={`mt-2 w-full cursor-pointer text-center text-black/50 underline hover:text-black/90`}
          >
            Back to all projects
          </div>
        </Link>
      </Modal>
    </Card>
  );
};
