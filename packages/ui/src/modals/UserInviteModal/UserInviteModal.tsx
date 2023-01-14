// import { gql, useMutation, useQuery } from "@apollo/client";
// import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import { gql, useMutation } from "@apollo/client";
import {
  MatchPercentage,
  Maybe,
  Members,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  Button,
  MemberInfo,
  Modal,
  SendMessageToUser,
  TextHeading3,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";
import { toast } from "react-toastify";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface IUserInviteModalProps {
  member?: Members;
  project?: Project;
  role?: RoleType;
  matchPercentage?: Maybe<MatchPercentage>;
  phase?: string;
  open?: boolean;
  onClose?: () => void;
}

export const UserInviteModal = ({
  member,
  project,
  role,
  matchPercentage,
  phase,
  open,
  onClose,
}: IUserInviteModalProps) => {
  // const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
  //   variables: {
  //     fields: {
  //       _id: member?._id,
  //     },
  //   },
  //   skip: !member?._id,
  //   context: { serviceName: "soilservice" },
  // });

  // const findMember = dataMemberInfo?.findMember;
  const [showInvite, setShowInvite] = useState(false);

  const [changeTeamMemberPhaseProject, {}] = useMutation(SET_APPLY_TO_PROJECT, {
    onCompleted: () => {
      console.log(changeTeamMemberPhaseProject);
      toast.success("success");
      onClose && onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReject = () => {
    // console.log("reject");
    if (project?._id && member?._id) {
      changeTeamMemberPhaseProject({
        variables: {
          fields: {
            projectID: project?._id,
            memberID: member?._id,
            roleID: role?._id,
            phase: "rejected",
          },
        },
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleAccept = () => {
    // console.log("accept");
    if (project?._id && member?._id) {
      changeTeamMemberPhaseProject({
        variables: {
          fields: {
            projectID: project?._id,
            memberID: member?._id,
            roleID: role?._id,
            phase: "committed",
          },
        },
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!member) return null;
  // if (!findMember) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <div className={`mt-4 grid grid-cols-5`}>
          <div className={`col-span-2 flex justify-end`}>
            {phase === "engaged" && (
              <Button onClick={() => handleReject()}>Reject</Button>
            )}
          </div>
          <div className={`col-span-1 h-8`}></div>
          <div className={`col-span-2`}>
            {!phase && !showInvite && (
              <Button onClick={() => setShowInvite(!showInvite)}>Invite</Button>
            )}
            {!phase && showInvite && (
              <Button onClick={() => setShowInvite(!showInvite)}>
                Cancel Message
              </Button>
            )}
            {phase === "engaged" && (
              <Button onClick={() => handleAccept()}>Accept</Button>
            )}
          </div>
        </div>
        <div className={`-mt-12`}>
          {showInvite ? (
            <div>
              <div>
                <UserWithDescription
                  member={member}
                  percentage={matchPercentage?.totalPercentage || undefined}
                />
              </div>
              <div className={`my-4`}>
                <TextHeading3 className={`text-md text-gray-500`}>
                  Start a converstation with @{member?.discordName} about your
                  project.
                </TextHeading3>
              </div>
              <SendMessageToUser
                member={member}
                project={project}
                role={role}
              />
            </div>
          ) : (
            <MemberInfo
              member={member}
              percentage={matchPercentage?.totalPercentage || undefined}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
