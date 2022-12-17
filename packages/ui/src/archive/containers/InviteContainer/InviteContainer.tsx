import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Project } from "@eden/package-graphql/generated";
import { Avatar, Button, Card, Loading } from "@eden/package-ui";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SET_ACCEPT_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface IInviteContainerProps {
  project?: Project;
}

export const InviteContainer = ({ project }: IInviteContainerProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  const [submitting, setSubmitting] = useState(false);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(SET_ACCEPT_PROJECT, {
    onCompleted: () => {
      console.log("onCompleted");
      router.push(`/my-projects/${project?._id}`);
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      {submitting ? (
        <Loading title={`Accepting...`} />
      ) : (
        <div className={`relative h-full`}>
          <div className={`flex`}>
            <Avatar src={``} isProject />
            <div className={`pl-8`}>
              <div className={`text-darkGreen text-2xl font-bold`}>
                {project?.title}
              </div>
              <div>
                ⚡
                <span className={`text-soilPurple text-3xl font-semibold`}>
                  %
                </span>
              </div>
            </div>
          </div>
          <div
            className={`text-darkGreen font-poppins text-2xl font-medium`}
          ></div>
          <div className={`font-Inter my-6 text-base text-zinc-500`}>
            Find more information below
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
                      projectID: project?._id,
                      memberID: currentUser?._id,
                      // roleID, // TODO: roleID is needed here
                      phase: "committed",
                    },
                  },
                });
              }}
            >
              Accept
              <span className={`my-auto pl-2`}>
                <BsArrowRight />
              </span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
