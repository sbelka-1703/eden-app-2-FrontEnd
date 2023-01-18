import { gql, useMutation, useQuery } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import {
  MatchPercentage,
  Maybe,
  Members,
} from "@eden/package-graphql/generated";
import {
  Button,
  MemberInfo,
  Modal,
  SendMessageUserToUser,
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

export interface IUserMessageModalProps {
  member?: Members;
  matchPercentage?: Maybe<MatchPercentage>;
  open?: boolean;
  onClose?: () => void;
}

export const UserMessageModal = ({
  member,
  matchPercentage,
  open,
  onClose,
}: IUserMessageModalProps) => {
  const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
    variables: {
      fields: {
        _id: member?._id,
      },
    },
    skip: !member?._id || !open,
    context: { serviceName: "soilservice" },
  });

  const findMember = dataMemberInfo?.findMember;
  const [showMessage, setShowMessage] = useState(false);

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

  if (!member) return null;
  // if (!findMember) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <div className={`mt-4 grid grid-cols-5`}>
          <div className={`col-span-2 flex justify-end`}></div>
          <div className={`col-span-1 h-8`}></div>
          <div className={`col-span-2`}>
            {!showMessage && (
              <Button onClick={() => setShowMessage(!showMessage)}>
                Connect with {member?.discordName}
              </Button>
            )}
            {showMessage && (
              <Button onClick={() => setShowMessage(!showMessage)}>
                Cancel Message
              </Button>
            )}
          </div>
        </div>
        <div className={`-mt-12`}>
          {showMessage ? (
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
              <SendMessageUserToUser member={member} />
            </div>
          ) : (
            <MemberInfo
              member={findMember || member}
              percentage={matchPercentage?.totalPercentage || undefined}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
